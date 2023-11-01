import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

//middleware()
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/hotels", hotelRoute);

//middlewar eto handle error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    error: errMessage,
  });
});

app.listen(8800, () => {
  connect();
  console.log("connected port 8800!");
});
