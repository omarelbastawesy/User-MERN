import "dotenv/config";

import express, { json } from "express";
import userRouter from "./routes/user.route.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";



const app = express();

connectDB();
app.use(json());
app.use(rateLimiter);

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`the server is start on the ${process.env.PORT}`);
});
