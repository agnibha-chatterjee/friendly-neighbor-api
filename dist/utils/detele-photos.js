"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhotos = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
exports.deletePhotos = function (directory) {
    fs_1.readdir(directory, function (err, files) {
        if (err)
            throw err;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            fs_1.unlink(path_1.join(directory, file), function (err) {
                if (err)
                    throw err;
            });
        }
    });
};
