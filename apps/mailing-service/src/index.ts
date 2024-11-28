import "dotenv/config";
import { createClient } from "redis";
import { z } from "zod";
import { transporter } from "./mailer";

const client = createClient({ url: process.env.REDIS_CLIENT_URL });

client.on("error", (error) => {
  // console.log(error);
  console.log("error encountered!!");
});

client.on("connect", () => {
  console.log("Connected!!");
});

client.on("end", () => {
  console.log("Connection Closed!!");
});

export const redisMailTemp = z.object({
  to: z.string().email(),
  subject: z.string(),
  text: z.string(),
  html: z.string(),
});

async function processSubmission(elements: z.infer<typeof redisMailTemp>) {
  const data = {
    ...elements,
    from: `SuperFamily <${process.env.SUPER_EMAIL}>`,
  };
  await transporter.sendMail(data);
}

async function startWorker() {
  try {
    await client.connect();

    let submission: null | { key: string; element: string };

    while (true) {
      try {
        submission = await client.brPop("mail-queue", 0);
        // @ts-ignore
        const data = await JSON.parse(submission.element);
        if (!redisMailTemp.safeParse(data).success) continue;
        await processSubmission(data);
        submission = null;
      } catch (error) {
        console.error("Error processing submission:", error);
        // @ts-ignore
        if (submission) client.lPush(submission?.key, submission?.element);
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startWorker();
