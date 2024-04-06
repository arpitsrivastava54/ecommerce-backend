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
exports.uploadBanner = exports.getAllBanner = void 0;
const services_1 = require("../../utils/services");
const ApiResponse_1 = require("../../utils/ApiResponse");
const banner_1 = __importDefault(require("../../models/banner"));
exports.getAllBanner = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    let banners;
    if (category) {
        banners = yield banner_1.default.find({ category }).select("-createdAt -updatedAt");
    }
    else {
        banners = yield banner_1.default.find().select("-createdAt -updatedAt");
    }
    if (!banners)
        throw new Error("no banner found");
    res.status(200).json(new ApiResponse_1.ApiResponse("success", banners));
}));
exports.uploadBanner = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, category } = req.body;
    if (!image || !category)
        throw new Error("All fields are required");
    const isImageUpload = yield banner_1.default.create({ image, category });
    if (!isImageUpload)
        throw new Error("Something went wrong while uploading image");
    yield isImageUpload.save();
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse("Banner upload successfully", isImageUpload));
}));
