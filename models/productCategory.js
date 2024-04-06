"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productCategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        required: [true, "Category image is required"],
        trim: true,
    },
});
const ProductCategory = mongoose_1.default.model("ProductCategory", productCategorySchema);
exports.default = ProductCategory;
