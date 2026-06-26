import Redis from "ioredis";

async function main() {
  const subscriber = new Redis(
    process.env.REDIS_URL ?? "redis://localhost:6379"
  );

  await subscriber.subscribe("inbox:user_2");

  console.log("👂 Listening...");

  subscriber.on("message", (channel, message) => {
    console.log("CHANNEL:", channel);
    console.log("MESSAGE:", message);
  });
}

main().catch(console.error);