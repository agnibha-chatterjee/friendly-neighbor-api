"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = exports.cloudinaryConfig = void 0;
var cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "uploader", { enumerable: true, get: function () { return cloudinary_1.uploader; } });
var cloudinaryConfig = function () {
    return cloudinary_1.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};
exports.cloudinaryConfig = cloudinaryConfig;
