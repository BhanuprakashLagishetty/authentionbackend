import logger from "./logger";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(`${err}   ${err.message}`);
  res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
