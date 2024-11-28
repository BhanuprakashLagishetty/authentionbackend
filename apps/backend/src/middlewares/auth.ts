import jwt, { JwtPayload, VerifyCallback } from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "../utils/db";
import { Request, Response, NextFunction } from "express";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const handler: VerifyCallback<JwtPayload | string> = async (
    error,
    decoded
  ) => {
    if (error) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const id = (decoded as JwtPayload).id ?? "";

    const user = await prisma.user.findUnique({ where: { userId: id } });

    if (user == null) {
      return next(new Error("user not found"));
    }

    req.user = user;
    next();
  };

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) throw "Cannot authenticate!!";

  jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? " ", handler);
};
