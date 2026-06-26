import Redis from "ioredis";

export async function GET() {
  const redis = new Redis(
    process.env.REDIS_URL ?? "redis://localhost:6379"
  );

  const stream = new ReadableStream({
    async start(controller) {
      await redis.subscribe("inbox:user_2");

      redis.on("message", (_, message) => {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${message}\n\n`
          )
        );
      });
    },

    cancel() {
      redis.disconnect();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}