"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var notificationController_1 = require("../controllers/notificationController");
var notificationRouter = express_1.Router();
notificationRouter.route('/register').post(express_async_handler_1.default(notificationController_1.registerNotification));
exports.default = notificationRouter;
