import express from "express";
import { getAllProductCategory, insertCategory } from "../controllers/mainWebsite/productCategory";

const router = express.Router();

router.get("/",getAllProductCategory)
router.post("/insert",insertCategory)


const productCategoryRouter = router;
export default productCategoryRouter;

