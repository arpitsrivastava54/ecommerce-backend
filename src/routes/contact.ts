import express from "express";
import {
 fetchContactData,
 insertContactData,
} from "../controllers/mainWebsite/contact";

const router = express.Router();

router.get("/", fetchContactData).post("/", insertContactData);

const contactRouter = router;
export default contactRouter;
