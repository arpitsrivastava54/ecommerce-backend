"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/mainWebsite/products");
const router = express_1.default.Router();
router.get("/", products_1.getAllProducts);
router.get("/latest", products_1.getLatestProducts);
router.post("/insert", products_1.insertProuct);
router.post("/insertMany", products_1.insertManyProducts);
const productsRoutes = router;
exports.default = productsRoutes;
