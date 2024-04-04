import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import ProductCategory from "../../models/productCategory";
import { tryCatchWrapper } from "../../utils/services";
// ["jackets","sweatshirts","hoodies","tshirt","joggers","shirts"]

export const insertCategory = tryCatchWrapper(
 async (req: Request, res: Response) => {
  const { name, image } = req.body;
  if (!name || !image) throw new Error("All fields are required");

  const product = new ProductCategory({ name:name.toLocaleLowerCase().trim(), image });

  if (!product)
   throw new Error("Something went wrong while inserting the product");

  await product.save();
  res
   .status(200)
   .json(new ApiResponse("Category insert successfully", product));
 }
);

export const getAllProductCategory = tryCatchWrapper(
  async (req:Request,res:Response)=>{
    const categories = await ProductCategory.find();
    if(!categories) throw new Error("Something went wrong While fetching the category");

    res.status(200).json(new ApiResponse("Category found successfully",categories))
  }
)
