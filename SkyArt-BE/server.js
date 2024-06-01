import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import categoryRoute  from "./routes/category.route.js";
import postRouter from './routes/post.route.js';
import eventRouter from './routes/event.route.js';
import orderRouter from './routes/order.route.js';
import paymentRouter from './routes/payments.route.js';
import commentRouter from './routes/comment.route.js';
import userrouter from './routes/Auth.route.js';
import artistrouter from './routes/Artist.route.js';
import feedbackrouter from "./routes/feedback.route.js";
import responserouter from "./routes/response.route.js";
import notificationrouter from "./routes/notification.route.js";

import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

const URL = process.env.DB_CONNECT;

mongoose
  .connect(URL, {family: 4})
  .then(() => {
    console.log(`Succefully connected to SkyArt`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(express.static("public"));

const PORT = process.env.PORT || 9090;
const hostname = "127.0.0.1";
app.use("/category", categoryRoute);
app.use("/posts", postRouter);
app.use("/event",eventRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);
app.use('/user',userrouter);
app.use('/artist',artistrouter);
app.use("/comment", commentRouter);
app.use("/feedback", feedbackrouter);
app.use("/responses", responserouter);
app.use("/notifications", notificationrouter);


app.listen(PORT, hostname, ()=>{
    console.log(`server running on http://${hostname}:${PORT}`);
})