"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var user_controller_1 = require("../controllers/user-controller");
var multer_config_1 = require("../utils/multer-config");
var authenticate_user_1 = __importDefault(require("../middlewares/authenticate-user"));
var userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.route('/login').post(express_async_handler_1.default(user_controller_1.loginOrSignUp));
userRouter.route('/register').post(express_async_handler_1.default(user_controller_1.registerUser));
userRouter.post('/logout', express_async_handler_1.default(user_controller_1.signUserOut));
userRouter
    .route('/:userId')
    .get(authenticate_user_1.default, user_controller_1.getUserData)
    .put(authenticate_user_1.default, multer_config_1.upload.single('image'), express_async_handler_1.default(user_controller_1.updateProfile));
