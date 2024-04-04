import express from "express";
import { getAllBanner, uploadBanner } from "../controllers/mainWebsite/banner";

const router = express.Router();

router.get("/",getAllBanner)

router.post("/upload-banner",uploadBanner)


const bannerRouter = router;
export default bannerRouter;