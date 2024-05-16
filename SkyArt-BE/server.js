import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import router from './routes/post.route.js';

const app = express();

const databaseName = 'skyart_db';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`, {family: 4})
  .then(() => {
    console.log(`Succefully connected to ${databaseName}`);
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

app.use("/addPost", router);


app.listen(PORT, hostname, ()=>{
    console.log(`server running on http://${hostname}:${PORT}`);
})