import { Router } from "express";
import { prisma } from "../utils/db";
import { HttpStatusCode } from "axios";

const router = Router();

router.post("/details", async (req, res, next) => {
  try {
    const data = req.body;
    if (req.user) {
      await prisma.user.update({
        where: { userId: req.user.userId },
        data: {
          userId: req.user.userId,
          email: req.user.email,
          ...data,
        },
      });
      return res.sendStatus(HttpStatusCode.Accepted);
    } else return res.sendStatus(HttpStatusCode.Unauthorized);
  } catch (error) {
    next(error);
  }
});

router.patch("/details", async (req, res, next) => {
  try {
    const data = req.body;

    if (req.user) {
      await prisma.user.update({
        where: { userId: req.user.userId },
        data: { userId: req.user.userId, email: req.user.email, ...data },
      });

      return res.sendStatus(HttpStatusCode.Accepted);
    } else return res.sendStatus(HttpStatusCode.Unauthorized);
  } catch (e) {
    next(e);
  }
});

export default router;
