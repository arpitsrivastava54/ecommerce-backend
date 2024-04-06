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
exports.getAllProductCategory = exports.insertCategory = void 0;
const ApiResponse_1 = require("../../utils/ApiResponse");
const productCategory_1 = __importDefault(require("../../models/productCategory"));
const services_1 = require("../../utils/services");
// ["jackets","sweatshirts","hoodies","tshirt","joggers","shirts"]
exports.insertCategory = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image } = req.body;
    if (!name || !image)
        throw new Error("All fields are required");
    const product = new productCategory_1.default({ name: name.toLocaleLowerCase().trim(), image });
    if (!product)
        throw new Error("Something went wrong while inserting the product");
    yield product.save();
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse("Category insert successfully", product));
}));
exports.getAllProductCategory = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield productCategory_1.default.find();
    if (!categories)
        throw new Error("Something went wrong While fetching the category");
    res.status(200).json(new ApiResponse_1.ApiResponse("Category found successfully", categories));
}));
