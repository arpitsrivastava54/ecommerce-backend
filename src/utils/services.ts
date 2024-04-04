import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types";

export const tryCatchWrapper =
 (fn: ControllerType) =>
 async (req: Request, res: Response, next: NextFunction) => {
  try {
   await fn(req, res, next);
  } catch (error: any) {
   res.status(500).json({
    status: false,
    message: error.message || "something went wrong",
   });
  }
 };

