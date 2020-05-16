"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var requestController_1 = require("../controllers/requestController");
var multerConfig_1 = require("../utils/multerConfig");
var requestRouter = express_1.Router();
requestRouter
    .route('/')
    .post(multerConfig_1.upload.array('images', 3), express_async_handler_1.default(requestController_1.createRequest));
exports.default = requestRouter;
