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
exports.insertManyProducts = exports.insertProuct = exports.getFilteredProducts = exports.getLatestRichProducts = exports.getLatestProducts = exports.getProductById = exports.getAllProduct = void 0;
const product_1 = __importDefault(require("../../models/product"));
const services_1 = require("../../utils/services");
const ApiResponse_1 = require("../../utils/ApiResponse");
const __1 = require("../..");
exports.getAllProduct = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    if (__1.myCache.has("products")) {
        products = __1.myCache.get("products");
    }
    else {
        products = yield product_1.default.find();
        __1.myCache.set("products", products);
    }
    if (!products)
        throw new Error("Something went wrong while fetching all products ");
    (0, services_1.deleteEmptyCache)("products", products);
    res.status(200).json(new ApiResponse_1.ApiResponse("Product fetch successfully", products));
}));
exports.getProductById = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const key = `product-${id}`;
    let product;
    if (__1.myCache.has(key)) {
        product = __1.myCache.get(key);
    }
    else {
        product = yield product_1.default.findById(id);
        __1.myCache.set(key, product);
    }
    if (!product)
        throw new Error("Something went wrong while fetching the products by id");
    res.status(200).json(new ApiResponse_1.ApiResponse("Product fetch successfully", product));
}));
// it will use on home page pass id = 1 || 2
exports.getLatestProducts = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if id == 1 ["jackets","sweatshirts","hoodies"] else ["tshirts","joggers","shirts"]
    const { id } = req.query;
    const key = `latest-products-${id}`;
    let categories;
    let products;
    if (id == "1") {
        categories = ["jackets", "sweatshirts", "hoodies"];
    }
    else {
        categories = ["tshirts", "joggers", "shirts"];
    }
    if (__1.myCache.has(key)) {
        products = __1.myCache.get(key);
    }
    else {
        // TODO ==> This query needs Optimization
        const first = yield product_1.default.find({ category: categories[0] })
            .sort({ createdAt: -1 })
            .limit(15);
        const second = yield product_1.default.find({ category: categories[1] })
            .sort({ createdAt: -1 })
            .limit(15);
        const third = yield product_1.default.find({ category: categories[2] })
            .sort({ createdAt: -1 })
            .limit(15);
        products = [...first, ...second, ...third];
        __1.myCache.set(key, products);
    }
    if (!products)
        throw new Error("Something went wrong while fetching the latestProducts");
    (0, services_1.deleteEmptyCache)(key, products);
    res.status(200).json(new ApiResponse_1.ApiResponse("Product fetch successfully", products));
}));
// it will use on home page
exports.getLatestRichProducts = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = "latest-product-3";
    let products;
    if (__1.myCache.has(key)) {
        products = __1.myCache.get(key);
        console.log("cache se aya");
    }
    else {
        products = yield product_1.default.find({ subCategory: "customized" })
            .sort({ createdAt: -1 })
            .limit(8);
        __1.myCache.set(key, products);
    }
    if (!products)
        throw new Error("Something went wrong while fetching the latest-richcollectionProducts");
    (0, services_1.deleteEmptyCache)(key, products);
    res.status(200).json(new ApiResponse_1.ApiResponse("Product fetch successfully", products));
}));
// it will use on men and women page pass subCategory = men || women || customized
exports.getFilteredProducts = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subCategory } = req.query;
    let products;
    const key = `subcategory-${subCategory}`;
    if (!subCategory)
        throw new Error("subCategory is required");
    if (__1.myCache.has(key)) {
        products = __1.myCache.get(key);
    }
    else {
        products = yield product_1.default.find({ subCategory }).sort({ createdAt: -1 });
        __1.myCache.set(key, products);
    }
    if (!products)
        throw new Error("Something went wrong while fetching the latest-richcollectionProducts");
    (0, services_1.deleteEmptyCache)(key, products);
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
    __1.myCache.del(["latest-products-1", "latest-products-2"]);
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse("Products inserted successfully", insertedProducts));
}));
