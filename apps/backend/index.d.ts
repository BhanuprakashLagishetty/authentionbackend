import { type User as dbUser } from "@prisma/client";
import * as express from "express";

declare global {
  namespace Express {
    interface User extends dbUser {}
  }
}

export {};
