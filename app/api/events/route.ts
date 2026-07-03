import Redis from "ioredis";

import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const channel = `inbox:user_${session.user.id}`;

  const redis = new Redis(
    process.env.REDIS_URL ?? "redis://localhost:6379"
  );

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let heartbeat: NodeJS.Timeout | null = null;

      try {
        await redis.subscribe(channel);

        console.log(`✅ SSE subscribed to ${channel}`);

        controller.enqueue(
          encoder.encode(
            `event: connected\ndata: ${JSON.stringify({
              status: "connected",
              channel,
            })}\n\n`
          )
        );

        heartbeat = setInterval(() => {
          try {
            controller.enqueue(
              encoder.encode(": ping\n\n")
            );
          } catch {
            if (heartbeat) clearInterval(heartbeat);
            redis.disconnect();
          }
        }, 30000);

        redis.on("message", (receivedChannel, message) => {
          if (receivedChannel !== channel) return;

          try {
            controller.enqueue(
              encoder.encode(
                `data: ${message}\n\n`
              )
            );
          } catch (error) {
            console.error("SSE Message Error:", error);

            if (heartbeat) clearInterval(heartbeat);

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

          if (heartbeat) {
            clearInterval(heartbeat);
          }

          try {
            controller.close();
          } catch {}
        });

      } catch (error) {
        console.error("SSE Setup Error:", error);

        if (heartbeat) {
          clearInterval(heartbeat);
        }

        try {
          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({
                message:
                  "Failed to establish SSE connection",
              })}\n\n`
            )
          );
        } catch {}

        controller.close();
      }
    },

    async cancel() {
      console.log(
        `🔌 Client disconnected from ${channel}`
      );

      try {
        await redis.unsubscribe(channel);
      } catch {}

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