"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    res.status(500).send({
        error: err.message,
    });
};
exports.default = errorHandler;
