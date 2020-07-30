"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RequestSchema = new mongoose_1.Schema({
    requestType: {
        type: { String: String },
    },
    requestedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'userId is required'],
        ref: 'user',
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
        ref: 'user',
        default: '',
        required: false,
    },
});
exports.default = mongoose_1.model('request', RequestSchema);
