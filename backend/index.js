import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRouter from "./routes/authentications.js";
import listRouter from "./routes/listRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Db Connected Success");
  })
  .catch((error) => {
    console.log(error);
  });

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/authentics", authRouter);
app.use("/api/listing", listRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(3000, () => {
  console.log(`Server is Runing on 3000`);
});
