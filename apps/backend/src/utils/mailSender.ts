import { z } from "zod";
import { client } from "./redis_client";

export const redisMailTemp = z.object({
  to: z.string().email(),
  subject: z.string(),
  text: z.string(),
  html: z.string(),
});

export const redisMailer = async (input: z.infer<typeof redisMailTemp>) => {
  if (!client.isReady) throw "lost connection to the email client";
  const result = redisMailTemp.safeParse(input);
  console.log(result,"result");
  if (result.error) throw result.error;
  await client.lPush("mail-queue", JSON.stringify(result.data));
};
