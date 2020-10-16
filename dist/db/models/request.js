"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
var mongoose_1 = require("mongoose");
var types_1 = require("../../types/types");
var requestSchema = new mongoose_1.Schema({
    requestType: {
        type: String,
        enum: Object.values(types_1.RequestType),
    },
    requestedBy: {
        type: String,
        required: [true, 'RequestId is required'],
        ref: 'Request',
    },
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true,
    },
    expiration: {
        type: Date,
        required: [true, 'expiration is required'],
    },
    createdAt: {
        type: Date,
    },
    contactNumber: {
        type: String,
        trim: true,
    },
    searchRadius: {
        type: Number,
        required: [true, 'searchRadius is required'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    orderStatus: {
        type: String,
        enum: Object.values(types_1.OrderStatus),
        default: types_1.OrderStatus.Created
    },
    location: {
        latitude: {
            type: Number,
            required: [true, 'location is required'],
        },
        longitude: {
            type: Number,
            required: [true, 'location is required'],
        },
    },
    cost: {
        type: Number,
    },
    images: [
        {
            name: { type: String },
            imageURL: { type: String },
        },
    ],
    respondedBy: { type: [String], default: [] },
    acceptedUser: {
        type: String,
        ref: 'User',
        default: '',
        required: false,
    },
});
var Request = mongoose_1.model('Request', requestSchema);
exports.Request = Request;
