import express from "express";
import crypto from "crypto";
import "dotenv/config";

const secret: crypto.BinaryLike = process.env.SAHHA_WEBHOOK_SECRET as string;
const router = express.Router();

router.post("/webhook", (req, res) => {
  const signatureHeader = req.headers["x-signature"];
  if (!signatureHeader) {
    return res.status(400).send("X-Signature header is missing.");
  }

  const externalIdHeader = req.headers["x-external-id"];
  if (!externalIdHeader) {
    return res.status(400).send("X-External-Id header is missing.");
  }

  const eventTypeHeader = req.headers["x-event-type"];
  if (!eventTypeHeader) {
    return res.status(400).send("X-Event-Type header is missing.");
  }

  const payload = JSON.stringify(req.body);

  const hmac = crypto.createHmac("sha256", secret);
  const computedHash = hmac.update(payload).digest("hex");

  if (signatureHeader !== computedHash) {
    return res.status(400).send("Invalid signature.");
  }

  console.log("Webhook received:", req.body);

  res.status(200).send("Ok");
});

export default router;
