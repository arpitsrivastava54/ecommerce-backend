"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const banner_1 = require("../controllers/mainWebsite/banner");
const router = express_1.default.Router();
router.get("/", banner_1.getAllBanner);
router.post("/upload-banner", banner_1.uploadBanner);
const bannerRouter = router;
exports.default = bannerRouter;
