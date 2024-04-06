import { Request, Response } from "express";
import Product from "../../models/product";
import { deleteEmptyCache, tryCatchWrapper } from "../../utils/services";
import { ApiResponse } from "../../utils/ApiResponse";
import { myCache } from "../..";

export const getAllProduct = tryCatchWrapper(
 async (req: Request, res: Response) => {
  let products;

  if (myCache.has("products")) {
   products = myCache.get("products");
  } else {
   products = await Product.find();
   myCache.set("products", products);
  }

  if (!products)
   throw new Error("Something went wrong while fetching all products ");

  deleteEmptyCache("products", products);
  res.status(200).json(new ApiResponse("Product fetch successfully", products));
 }
);

export const getProductById = tryCatchWrapper(
 async (req: Request, res: Response) => {
  const { id } = req.query;
  const key = `product-${id}`;

  let product;
  if (myCache.has(key)) {
   product = myCache.get(key);
  } else {
   product = await Product.findById(id);
   myCache.set(key, product);
  }

  if (!product)
   throw new Error("Something went wrong while fetching the products by id");

  res.status(200).json(new ApiResponse("Product fetch successfully", product));
 }
);

// it will use on home page pass id = 1 || 2

export const getLatestProducts = tryCatchWrapper(async (req, res) => {
 // if id == 1 ["jackets","sweatshirts","hoodies"] else ["tshirts","joggers","shirts"]

 const { id } = req.query;
 const key = `latest-products-${id}`;
 let categories;
 let products;

 if (id == "1") {
  categories = ["jackets", "sweatshirts", "hoodies"];
 } else {
  categories = ["tshirts", "joggers", "shirts"];
 }
 if (myCache.has(key)) {
  products = myCache.get(key);
 } else {
  // TODO ==> This query needs Optimization

  const first = await Product.find({ category: categories[0] })
   .sort({ createdAt: -1 })
   .limit(15);
  const second = await Product.find({ category: categories[1] })
   .sort({ createdAt: -1 })
   .limit(15);
  const third = await Product.find({ category: categories[2] })
   .sort({ createdAt: -1 })
   .limit(15);

  products = [...first, ...second, ...third];
  myCache.set(key, products);
 }
 if (!products)
  throw new Error("Something went wrong while fetching the latestProducts");

 deleteEmptyCache(key, products);

 res.status(200).json(new ApiResponse("Product fetch successfully", products));
});

// it will use on home page
export const getLatestRichProducts = tryCatchWrapper(async (req, res) => {
 const key = "latest-product-3";
 let products;
 if (myCache.has(key)) {
  products = myCache.get(key);
  console.log("cache se aya");
 } else {
  products = await Product.find({ subCategory: "customized" })
   .sort({ createdAt: -1 })
   .limit(8);
  myCache.set(key, products);
 }

 if (!products)
  throw new Error(
   "Something went wrong while fetching the latest-richcollectionProducts"
  );
 deleteEmptyCache(key, products);
 res.status(200).json(new ApiResponse("Product fetch successfully", products));
});

// it will use on men and women page pass subCategory = men || women || customized
export const getFilteredProducts = tryCatchWrapper(async (req, res) => {
 const { subCategory } = req.query;
 let products;

 const key = `subcategory-${subCategory}`;

 if (!subCategory) throw new Error("subCategory is required");

 if (myCache.has(key)) {
  products = myCache.get(key);
 } else {
  products = await Product.find({ subCategory }).sort({ createdAt: -1 });
  myCache.set(key, products);
 }

 if (!products)
  throw new Error(
   "Something went wrong while fetching the latest-richcollectionProducts"
  );
 deleteEmptyCache(key, products);

 res.status(200).json(new ApiResponse("Product fetch successfully", products));
});

export const insertProuct = tryCatchWrapper(
 async (req: Request<{}, {}, ProductType>, res: Response) => {
  const { category, image, name, price, subCategory, description } = req.body;

  if (!category || !image || !name || !price || !subCategory || !description)
   throw new Error("All field are required");

  const product = new Product({
   category,
   image,
   name,
   price,
   subCategory,
   description,
  });
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
  myCache.del(["latest-products-1", "latest-products-2"]);
  res
   .status(200)
   .json(new ApiResponse("Products inserted successfully", insertedProducts));
 }
);

type ProductType = {
 name: string;
 image: string;
 price: number;
 category: string;
 subCategory: string;
 description: string;
};
