import passport from "passport";
import { prisma } from "./db";
import "dotenv/config";
import {
  Strategy as GoogleStrategy,
  Profile as googleProfile,
} from "passport-google-oauth20";
import {
  Strategy as FacebookStrategy,
  Profile as fbProfile,
} from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-oauth2";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  JwtFromRequestFunction,
} from "passport-jwt";
import logger from "../middlewares/logger";
import { User } from "@prisma/client";

passport.serializeUser((user: User, done) => done(null, user.userId));
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userId: id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/google/callback",
    },
    strategyHandler
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: "/api/auth/facebook/callback",
      // profileFields: ["id", "displayName", "emails"],
    },
    strategyHandler
  )
);

passport.use(
  new TwitterStrategy(
    {
      authorizationURL:
        "https://twitter.com/i/oauth2/authorize?code_challenge=challenge&code_challenge_method=plain",
      tokenURL: "https://api.twitter.com/2/oauth2/token",
      clientID: process.env.TWITTER_CONSUMER_KEY as string,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET as string,
      callbackURL: "http://127.0.0.1:3000/api/auth/twitter/callback",
      scope: ["offline.access"],
    },
    strategyHandler
  )
);

var opts: { jwtFromRequest: JwtFromRequestFunction; secretOrKey: string } = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: (process.env.JWT_TOKEN_SECRET as string) ?? "abcd",
};
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: { userId: jwt_payload.userId },
      });
      if (!user) return done(null, false);

      done(null, user);
    } catch (e) {
      done(e, null);
    }
  })
);

async function strategyHandler(
  token: string,
  secondToken: string,
  profile: googleProfile | fbProfile,
  done: (error: any, user?: any) => void
) {
  console.log(profile);
  const email = profile.emails ? profile.emails[0].value : null;
  const photo = profile.photos ? profile.photos[0].value : null;
  const provider = profile.provider;
  if (email == null) return done("user not found");
  try {
    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        provider: profile.provider,
        providerId: profile.id,
      },
      create: {
        name: profile.displayName,
        provider: profile.provider,
        providerId: profile.id,
        email,
        phoneNumber: photo,
      },
    });
    if (!user) return done("User not found", null);
    return done(null, user);
  } catch (error) {
    logger.error(`${provider} Error: ${error}`);
    console.log("strategyHandler", error);
    done(error, null);
  }
}

export { passport };
