"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataUri = exports.multerUploads = void 0;
var multer_1 = __importDefault(require("multer"));
var datauri_1 = __importDefault(require("datauri"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.memoryStorage();
var dUri = new datauri_1.default('temp');
var dataUri = function (req) {
    return dUri.format(path_1.default.extname(req.file.originalname).toString(), req.file.buffer);
};
exports.dataUri = dataUri;
var multerUploads = multer_1.default({ storage: storage }).single('image');
exports.multerUploads = multerUploads;
