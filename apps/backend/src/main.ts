import express from "express";
import "dotenv/config";
import authRouter from "./routers/authRouter";
import editRouter from "./routers/editRouter";
import nutritionRouter from "./routers/nutritionRouter";
import sahhaRouter from "./routers/sahhaRouter";
import healthRouter from "./routers/healthRouter";
import cookieParser from "cookie-parser";
import { authorize } from "./middlewares/auth";
import { client } from "./utils/redis_client";
import errorHandler from "./middlewares/errorHandler";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
  // Allow all origins (for testing purposes)
  const cors =  require('cors');



const app = express();
app.use(cors())





const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => {
      return client.sendCommand(args);
    },
  }),
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 10 minutes",
});

app.get("/", authorize, (req, res) => {
  return res.send("hello");
});

app.use("/api/auth", limiter, authRouter);

app.use("/api/edit", authorize, editRouter);

app.use("/api/nutrition", authorize, nutritionRouter);

app.use("/api/sahha", authorize, sahhaRouter);

app.use("/api/health", authorize, healthRouter);

app.use(errorHandler);

async function startMain() {
  try {
    // if(!client.isOpen) await client.connect();
    app.listen(5000, '0.0.0.0', () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

startMain();
