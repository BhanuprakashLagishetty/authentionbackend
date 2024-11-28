import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "@prisma/client";

export const generateAccessToken = (user: Express.User) => {
  return jwt.sign(
    { userId: user.userId },
    process.env.JWT_TOKEN_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

export const generateRefreshToken = (user: Express.User) => {
  return jwt.sign(
    { userId: user.userId },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "1y",
    }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_TOKEN_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET as string);
};
