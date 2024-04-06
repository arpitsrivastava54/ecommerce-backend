"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertManyProducts = exports.insertProuct = exports.getLatestProducts = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../../models/product"));
const services_1 = require("../../utils/services");
const ApiResponse_1 = require("../../utils/ApiResponse");
const __1 = require("../..");
exports.getAllProducts = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, subCategory } = req.query;
    let products;
    if (__1.myCache.has("products")) {
        products = __1.myCache.get("products");
    }
    else if (productId) {
        products = yield product_1.default.find({ _id: productId });
    }
    else if (subCategory) {
        products = yield product_1.default.find({ subCategory });
    }
    else {
        products = yield product_1.default.find();
        __1.myCache.set("products", products);
    }
    if (!products)
        throw new Error("Something went wrong while fetching the products");
    res.status(200).json(new ApiResponse_1.ApiResponse("Product fetch successfully", products));
}));
exports.getLatestProducts = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    let products;
    if (category) {
        products = yield product_1.default.find({ category }).sort({ createdAt: -1 }).limit(4);
    }
    else {
        products = yield product_1.default.find().sort({ createdAt: -1 }).limit(8);
    }
    if (!products)
        throw new Error("Something went wrong while fetching the products");
    res.status(200).json(new ApiResponse_1.ApiResponse("Product fetch successfully", products));
}));
exports.insertProuct = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, image, name, price, subCategory, description } = req.body;
    if (!category || !image || !name || !price || !subCategory || !description)
        throw new Error("All field are required");
    const product = new product_1.default({
        category,
        image,
        name,
        price,
        subCategory,
        description,
    });
    if (!product)
        throw new Error("Something went wrong while inserting the product");
    yield product.save();
    res.status(200).json(new ApiResponse_1.ApiResponse("Product insert successfully", product));
}));
exports.insertManyProducts = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = req.body;
    if (!Array.isArray(products) || products.length === 0) {
        throw new Error("No products provided");
    }
    const insertedProducts = yield product_1.default.insertMany(products);
    if (!insertedProducts || insertedProducts.length === 0) {
        throw new Error("Failed to insert products");
    }
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse("Products inserted successfully", insertedProducts));
}));
