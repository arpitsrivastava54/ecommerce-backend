import express from "express"
import { getProductById, getLatestProducts, insertManyProducts, insertProuct, getAllProduct, getFilteredProducts, getLatestRichProducts } from "../controllers/mainWebsite/products";

const router = express.Router();

router.get("/",getAllProduct);

//pass id=445646554 in queryparams
router.get("/product",getProductById);
router.get("/latest",getLatestProducts)
router.get("/latestRichCollection",getLatestRichProducts)

router.get("/filterdProducts",getFilteredProducts)



router.post("/insert",insertProuct)
router.post("/insertMany",insertManyProducts)



const productsRoutes = router;
export default productsRoutes;
