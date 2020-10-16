"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserLocation = void 0;
var grpc_client_1 = require("../grpc-client");
exports.saveUserLocation = function (properties) {
    grpc_client_1.client.saveUserLocation({
        userId: properties.userId,
        location: properties.location,
        radius: properties.radius,
    }, function (err, data) {
        if (err)
            console.log("ERROR - " + err);
        if (data.success) {
            console.log("Updated user - " + properties.userId, data);
        }
    });
};
