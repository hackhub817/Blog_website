import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import route from "./routes/user.route.js";
import BlogRoute from "./routes/blog.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = 3000;
app.use(cookieParser());

const url = process.env.DB_URL;
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

mongoose.connect(url).then(() => {
  console.log("DB Connected");
});

app.use("/api/users", route);
app.use("/api/blogs", BlogRoute);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`App is running on port number ${port}`);
});
