"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_1 = require("../controllers/mainWebsite/contact");
const router = express_1.default.Router();
router.get("/", contact_1.fetchContactData).post("/", contact_1.insertContactData);
const contactRouter = router;
exports.default = contactRouter;
