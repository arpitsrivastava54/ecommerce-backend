"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    image: {
        type: String,
        required: [true, "Product image is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    oldPrice: {
        type: Number,
        default: null,
    },
    sizes: {
        type: [String],
        default: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    category: {
        type: String,
        enum: ["jackets", "sweatshirts", "hoodies", "tshirts", "joggers", "shirts"],
        required: [true, "Category is required"],
    },
    subCategory: {
        type: String,
        enum: ["men", "women"],
        required: [true, "Sub Category is required"],
    },
    sale: {
        type: Boolean,
        default: false,
    },
    richCollection: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
// {
//   name: "Example Product",
//   description: "This is an example product description.",
//   image: "example.jpg",
//   price: 50,
//   category: "tshirts",
//   subCategory: "men",
//   sale: true,
// }
