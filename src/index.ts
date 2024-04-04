import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productsRoutes from "./routes/products";
import bannerRouter from "./routes/banner";
import productCategoryRouter from "./routes/productCategory";
import contactRouter from "./routes/contact";
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();

// connect db
mongoose
 .connect(process.env.MONGO_URI || "mongodb://0.0.0.0:27017/ecommerce")
 .then(() => console.log("database connected "))
 .catch((err) =>
  console.log("something went wrong while connecting data base", err)
 );

app.use(express.json());

// main-website routes

app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/banners", bannerRouter);
app.use("/api/v1/product-category", productCategoryRouter);
app.use("/api/v1/contact", contactRouter);

app.listen(process.env.PORT, () => {
 console.log("server started : ", process.env.PORT);
});
