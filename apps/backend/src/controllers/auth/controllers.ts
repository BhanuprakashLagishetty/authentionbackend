import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import "dotenv/config";
import { prisma } from "../../utils/db";
import randomstring from "randomstring";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { redisMailer } from "../../utils/mailSender";

const saltRounds = 10;

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, email } = req.body;
    await prisma.refreshToken.delete({
      where: {
        refreshToken,
        user: { email },
      },
    });
    return res.status(200);
  } catch (error) {
    next(error);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    if (email === null) return res.status(HttpStatusCode.NotAcceptable);
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    await prisma.otp.upsert({
      where: { userId: user.userId },
      create: {
        userId: user.userId,
        otp: hashedOtp,
        expiresAt: new Date(new Date().getTime() + 3600 * 1000),
      },
      update: {
        otp: hashedOtp,
        expiresAt: new Date(new Date().getTime() + 3600 * 1000),
      },
    });
    await otpMailer(email, otp);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name } = req.body;
    if (email === null || name === null)
      return res.status(HttpStatusCode.NotAcceptable);

    const user = await prisma.user.upsert({
      where: { email, name },
      create: { email, name },
      update: {},
    });

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    await prisma.otp.upsert({
      where: { userId: user.userId },
      create: {
        userId: user.userId,
        otp: hashedOtp,
        expiresAt: new Date(new Date().getTime() + 3600 * 1000),
      },
      update: {
        otp: hashedOtp,
        expiresAt: new Date(new Date().getTime() + 3600 * 1000),
      },
    });
    await otpMailer(email, otp);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, email } = req.body;
    if (otp == null || email == null)
      return res.status(HttpStatusCode.BadRequest);
    const dbOTP = await prisma.otp.findFirstOrThrow({
      where: { user: { email } },
    });
    const verified = await bcrypt.compare(otp, dbOTP.otp);
    const expired = new Date() > dbOTP.expiresAt;
    if (verified && !expired) {
      const user = await prisma.user.findUniqueOrThrow({ where: { email } });
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await prisma.refreshToken.create({
        data: { userId: user.userId, refreshToken },
      });

      return res.json({ accessToken, refreshToken });
    } else next("Invalid Details");
  } catch (e) {
    next(e);
  }
};

export function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

async function otpMailer(email: string, otp: string) {
  await redisMailer({
    to: email,
    subject: "Super family Login",
    text: `One step away from joining our Family. The otp for the logging into the super-family: ${otp}`,
    html: `<h1>Hi There!!</h1><p>One step away from joining our Family. The otp for the logging into the super-family: <strong>${otp}</strong></p>`,
  });
}
