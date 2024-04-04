import { Request, Response } from "express";
import Product from "../../models/product";
import { tryCatchWrapper } from "../../utils/services";
import { ApiResponse } from "../../utils/ApiResponse";

export const getAllProducts = tryCatchWrapper(
 async (req: Request, res: Response) => {
  const { productId, subCategory } = req.query;

  let products;

  if (productId) {
   products = await Product.find({ _id: productId });
  } else if (subCategory) {
   products = await Product.find({ subCategory });
  }else{
    products = await Product.find();
  }

  if (!products)
   throw new Error("Something went wrong while fetching the products");

  res.status(200).json(new ApiResponse("Product fetch successfully", products));
 }
);

export const getLatestProducts = tryCatchWrapper(async (req, res) => {
 const { category } = req.query;
 let products;

 if (category) {
  products = await Product.find({ category }).sort({ createdAt: -1 }).limit(4);
 } else {
  products = await Product.find().sort({ createdAt: -1 }).limit(8);
 }

 if (!products)
  throw new Error("Something went wrong while fetching the products");

 res.status(200).json(new ApiResponse("Product fetch successfully", products));
});

export const insertProuct = tryCatchWrapper(
 async (req: Request<{}, {}, ProductType>, res: Response) => {
  const { category, image, name, price, subCategory, description } = req.body;
  
  if (!category || !image || !name || !price || !subCategory || !description)
   throw new Error("All field are required");

  const product = new Product({ category, image, name, price, subCategory,description });
  if (!product)
   throw new Error("Something went wrong while inserting the product");

  await product.save();
  res.status(200).json(new ApiResponse("Product insert successfully", product));
 }
);

export const insertManyProducts = tryCatchWrapper(
  async (req: Request<{}, {}, ProductType[]>, res: Response) => {
   const products = req.body;
   
   if (!Array.isArray(products) || products.length === 0) {
     throw new Error("No products provided");
   }
 
   const insertedProducts = await Product.insertMany(products);
   
   if (!insertedProducts || insertedProducts.length === 0) {
     throw new Error("Failed to insert products");
   }
 
   res.status(200).json(new ApiResponse("Products inserted successfully", insertedProducts));
  }
 );

type ProductType = {
 name: string;
 image: string;
 price: number;
 category: string;
 subCategory: string;
 description:string;
};
