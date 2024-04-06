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
exports.insertContactData = exports.fetchContactData = void 0;
const services_1 = require("../../utils/services");
const contact_1 = __importDefault(require("../../models/contact"));
const ApiResponse_1 = require("../../utils/ApiResponse");
exports.fetchContactData = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield contact_1.default.find();
    if (!data)
        throw new Error("Something went wrong while fetching Contact Data");
    res.status(200).json(new ApiResponse_1.ApiResponse("Contact data fetch Successfully", data));
}));
exports.insertContactData = (0, services_1.tryCatchWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, message, phone } = req.body;
    if (!email || !firstName || !lastName || !message || !phone)
        throw new Error("All fields are required");
    const contact = yield contact_1.default.create({
        email,
        firstName,
        lastName,
        message,
        phone,
    });
    if (!contact)
        throw new Error("Something went wrong while inserting contact data");
    yield contact.save();
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse("Contact Data insert successfully", contact));
}));
