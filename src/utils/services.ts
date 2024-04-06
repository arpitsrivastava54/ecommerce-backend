import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types";
import { myCache } from "..";

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

export function deleteEmptyCache( key: string,data: any,) {
 if (data.length == 0) myCache.del(key);
}
