"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var notification_controller_1 = require("../controllers/notification-controller");
var notificationRouter = express_1.Router();
exports.notificationRouter = notificationRouter;
notificationRouter.route('/register').post(express_async_handler_1.default(notification_controller_1.registerNotification));
