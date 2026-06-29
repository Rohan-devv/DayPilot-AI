// app/api/events/route.ts

import Redis from "ioredis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const redis = new Redis(
    process.env.REDIS_URL ?? "redis://localhost:6379"
  );

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        await redis.subscribe("inbox:user_2");

        // Initial connection event on server side on client fetching.... 
        controller.enqueue(
          encoder.encode(
            `event: connected\ndata: {"status":"connected"}\n\n`
          )
        );

        // Heartbeat every 30s
        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(
              encoder.encode(": ping\n\n")
            );
          } catch (error) {
            console.error("Heartbeat Error:", error);
            clearInterval(heartbeat);
            redis.disconnect();
          }
        }, 30000);

        redis.on("message", (_, message) => {
          try {
            controller.enqueue(
              encoder.encode(`data: ${message}\n\n`)
            );
          } catch (error) {
            console.error("SSE Message Error:", error);
            clearInterval(heartbeat);
            redis.disconnect();
          }
        });

        redis.on("error", (error) => {
          console.error("Redis Error:", error);

          try {
            controller.enqueue(
              encoder.encode(
                `event: error\ndata: ${JSON.stringify({
                  message: "Redis connection error",
                })}\n\n`
              )
            );
          } catch {}
        });

        redis.on("end", () => {
          console.log("Redis connection ended");

          try {
            controller.close();
          } catch {}
        });

      } catch (error) {
        console.error("SSE Setup Error:", error);

        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({
              message: "Failed to establish SSE connection",
            })}\n\n`
          )
        );

        controller.close();
      }
    },

    cancel() {
      console.log("Client disconnected from SSE");

      redis.unsubscribe();
      redis.disconnect();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control":
        "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}