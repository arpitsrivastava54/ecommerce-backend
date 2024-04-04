import express from "express"
import { getAllProducts, getLatestProducts, insertManyProducts, insertProuct } from "../controllers/mainWebsite/products";

const router = express.Router();


router.get("/",getAllProducts);
router.get("/latest",getLatestProducts)




router.post("/insert",insertProuct)
router.post("/insertMany",insertManyProducts)



const productsRoutes = router;
export default productsRoutes;
