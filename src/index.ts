import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productsRoutes from "./routes/products";
import bannerRouter from "./routes/banner";
import productCategoryRouter from "./routes/productCategory";
import contactRouter from "./routes/contact";
import cors from "cors";
import NodeCache from "node-cache"
import * as dotenv from "dotenv";
dotenv.config();

export const myCache = new NodeCache();

const app = express();

// connect db

const connectDB = async () => {
 try {
  const conn = await mongoose.connect(
   process.env.MONGO_URI || "mongodb://0.0.0.0:27017/ecommerce"
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
 } catch (error) {
  console.log(error);
  process.exit(1);
 }
};

app.use(
 cors({
  origin: "*",
 })
);
app.use(express.json());

// main-website routes
app.get("/", (req, res) => {
 res.send("Working .....");
});
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/banners", bannerRouter);
app.use("/api/v1/product-category", productCategoryRouter);
app.use("/api/v1/contact", contactRouter);

connectDB().then(() => {
 app.listen(process.env.PORT, () => {
  console.log("listening for requests...");
 });
});
