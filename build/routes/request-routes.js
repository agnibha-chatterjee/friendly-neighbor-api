"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var request_controller_1 = require("../controllers/request-controller");
var multer_config_1 = require("../utils/multer-config");
var authenticate_user_1 = __importDefault(require("../middlewares/authenticate-user"));
var requestRouter = express_1.Router();
exports.requestRouter = requestRouter;
requestRouter
    .route('/:userId')
    .get(authenticate_user_1.default, express_async_handler_1.default(request_controller_1.getFilteredRequests));
requestRouter
    .route('/history/:userId')
    .get(authenticate_user_1.default, express_async_handler_1.default(request_controller_1.getRequestHistory));
requestRouter.route('/').post(authenticate_user_1.default, multer_config_1.upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
]), express_async_handler_1.default(request_controller_1.createRequest));
requestRouter.route('/:requestId').delete(authenticate_user_1.default, request_controller_1.deleteRequest);
requestRouter
    .route('/:requestId/respond/:userId')
    .get(authenticate_user_1.default, request_controller_1.addUserToRespondedBy)
    .patch(authenticate_user_1.default, request_controller_1.acceptUserThatResponded)
    .delete(authenticate_user_1.default, request_controller_1.removeUserThatResponded);
