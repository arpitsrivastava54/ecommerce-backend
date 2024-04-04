import { Request, Response } from "express";
import { tryCatchWrapper } from "../../utils/services";
import { ApiResponse } from "../../utils/ApiResponse";
import Banner from "../../models/banner";

export const getAllBanner = tryCatchWrapper(
 async (req: Request, res: Response) => {
  const { category } = req.query;
  let banners;

  if (category) {
   banners = await Banner.find({ category }).select("-createdAt -updatedAt");
  } else {
   banners = await Banner.find().select("-createdAt -updatedAt");
  }

  if (!banners) throw new Error("no banner found");
  
  res.status(200).json(new ApiResponse("success", banners));
 }
);

export const uploadBanner = tryCatchWrapper(
 async (
  req: Request<{}, {}, { image: string; category: string }>,
  res: Response
 ) => {
  const { image, category } = req.body;
  if (!image || !category) throw new Error("All fields are required");

  const isImageUpload = await Banner.create({ image, category });

  if (!isImageUpload)
   throw new Error("Something went wrong while uploading image");

  await isImageUpload.save();

  res
   .status(200)
   .json(new ApiResponse("Banner upload successfully", isImageUpload));
 }
);
