"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productCategory_1 = require("../controllers/mainWebsite/productCategory");
const router = express_1.default.Router();
router.get("/", productCategory_1.getAllProductCategory);
router.post("/insert", productCategory_1.insertCategory);
const productCategoryRouter = router;
exports.default = productCategoryRouter;
