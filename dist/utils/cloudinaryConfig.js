"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeCloudinary = exports.uploader = void 0;
var cloudinary_1 = require("cloudinary");
var config = cloudinary_1.v2.config, uploader = cloudinary_1.v2.uploader;
exports.uploader = uploader;
var initializeCloudinary = function () {
    return config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};
exports.initializeCloudinary = initializeCloudinary;
