"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfilePhotos = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
exports.deleteProfilePhotos = function (userId, file) {
    fs_1.unlinkSync(path_1.resolve(__dirname, "../../uploads/" + userId + "-" + file.originalname));
    fs_1.unlinkSync(path_1.resolve(__dirname, "../../uploads/" + userId + "-" + file.originalname + ".jpeg"));
};
