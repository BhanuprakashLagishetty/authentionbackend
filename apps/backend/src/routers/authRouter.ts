import express from "express";
import {
  logIn,
  register,
  verify,
  signOut,
} from "../controllers/auth/controllers";
import { passport } from "../utils/passport";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import logger from "../middlewares/logger";
import { prisma } from "../utils/db";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

const router = express.Router();

router.post("/login", logIn);

router.post("/register", register);

router.post("/verify", verify);

router.get("/logout", signOut);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  async (req, res, next) => {
    // console.log("reached the callback handler");
    try {
      if (!req.user) throw "cannot find the user";
      const accessToken = generateAccessToken(req.user);
      const refreshToken = generateRefreshToken(req.user);

      const userId = req.user.userId;

      if (!userId) return next("user not found");

      await prisma.refreshToken.create({
        data: { userId, refreshToken },
      });

      res.redirect(
        `${process.env.CLIENT_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (error) {
      logger.error(`Auth Callback Error: ${error}`);
      return res.status(500).json({ message: "Authentication failed" });
    }
  }
);

// Facebook OAuth Routes
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: "/" }),
  async (req: Express.Request, res, next) => {
    try {
      if (!req.user) throw "cannot find the user";
      const accessToken = generateAccessToken(req.user);
      const refreshToken = generateRefreshToken(req.user);
      const userId = req.user.userId;

      // const x: Express.User = {};

      if (!userId) return next("user not found");

      if (!userId) return next("user not found");

      await prisma.refreshToken.create({
        data: { userId, refreshToken },
      });

      res.redirect(
        `${process.env.CLIENT_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (error) {
      logger.error(`Auth Callback Error: ${error}`);
      return res.status(500).json({ message: "Authentication failed" });
    }
  }
);

// Twitter OAuth Routes
router.get("/twitter", passport.authenticate("oauth2", { session: false }));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { session: false, failureRedirect: "/" }),
  async (req, res, next) => {
    try {
      if (!req.user) throw "cannot find the user";
      const accessToken = generateAccessToken(req.user);
      const refreshToken = generateRefreshToken(req.user);

      const userId = req.user.userId;

      await prisma.refreshToken.create({
        data: { userId, refreshToken },
      });

      return res.redirect(
        `${process.env.CLIENT_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
      );
    } catch (error) {
      logger.error(`Auth Callback Error: ${error}`);
      return res.status(500).json({ message: "Authentication failed" });
    }
  }
);

// Refresh Token Route
router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token Required" });
  }

  try {
    const dbData = await prisma.refreshToken.findFirst({
      where: { refreshToken },
    });

    if (!dbData) return res.status(403).json({ message: "Unauthorized" });

    const payload: JwtPayload = verifyRefreshToken(refreshToken) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { userId: payload.userId },
    });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Optionally, verify the refresh token is still valid (if stored in DB)

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    logger.error(`Refresh Token Error: ${error}`);
    return res.status(403).json({ message: "Invalid Refresh Token" });
  }
});

export default router;
