"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var userController_1 = require("../controllers/userController");
var userRouter = express_1.Router();
userRouter.route('/login').post(express_async_handler_1.default(userController_1.loginOrSignUp));
userRouter.route('/register').post(express_async_handler_1.default(userController_1.registerUser));
// userRouter.post('/user/coordinates', asyncHandler(postUserCoordinates));
exports.default = userRouter;
