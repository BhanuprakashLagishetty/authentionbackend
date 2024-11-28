import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_CLIENT_URL,
});

client.on("error", (error) => {
  console.error("---------------------------------------------------------");
  console.error(error);
});

client.on("connect", () => {
  console.error("---------------------------------------------------------");
  console.log("Connected to client");
});

client.on("end", () => {
  console.error("---------------------------------------------------------");
  console.log("client connection ended");
});

if (!client.isOpen)
  client.connect().catch((err) => {
    console.log("cannot connect to the boi..");
  });

export { client };
