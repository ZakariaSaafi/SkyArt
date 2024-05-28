import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from './routes/post.route.js';
import eventRouter from './routes/event.route.js';
import orderRouter from './routes/order.route.js';  // Import the order routes
import paymentRouter from './routes/payments.route.js';  // Import the payment routes
import dotenv from 'dotenv';
import userrouter from './routes/Auth.route.js';
dotenv.config();
const app = express();
import artistrouter from './routes/Artist.route.js';


mongoose.set('debug', true);
mongoose.Promise = global.Promise;


//dotenv variables
dotenv.config();

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
app.use("/posts", postRouter);
app.use("/event",eventRouter);
app.use("/orders", orderRouter);  // Use order router
app.use("/payments", paymentRouter);  // Use payment router
app.use('/user',userrouter); // Use User authentification router
app.use('/artist',artistrouter); // Use Artist authentification router

app.listen(PORT, hostname, ()=>{
    console.log(`server running on http://${hostname}:${PORT}`);
})