"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.RequestType = void 0;
var RequestType;
(function (RequestType) {
    RequestType["Request"] = "request";
    RequestType["Offering"] = "offering";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Created"] = "created";
    OrderStatus["Ongoing"] = "ongoing";
    OrderStatus["Complete"] = "complete";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
