"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNotification = void 0;
var grpc_client_1 = require("../grpc/grpc-client");
exports.registerNotification = function (req, res) {
    var _a = req.body, token = _a.token, userId = _a.userId;
    grpc_client_1.client.saveUserForNotifications({ userId: userId, notifyToken: token }, function (err, data) {
        if (err)
            console.log("Error - " + err);
        if (data.success)
            console.log("Now sending notifications to " + userId);
    });
};
