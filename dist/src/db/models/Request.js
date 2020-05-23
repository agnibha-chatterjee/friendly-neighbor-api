"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var shortid_1 = require("shortid");
var RequestSchema = new mongoose_1.Schema({
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
        default: Date.now,
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
    reqUID: {
        type: String,
        unique: true,
        default: shortid_1.generate,
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
});
exports.default = mongoose_1.model('request', RequestSchema);
