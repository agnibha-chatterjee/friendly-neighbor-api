"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var shortid_1 = require("shortid");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
    },
    googleId: {
        type: String,
        required: [true, 'googleId is required'],
        trim: true,
        unique: true,
    },
    uid: {
        type: String,
        unique: true,
        default: shortid_1.generate,
    },
    profilePicture: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: String,
        trim: true,
    },
    address: {
        addr: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true },
        pincode: { type: Number },
    },
    cloudinaryPublicId: {
        type: String,
        trim: true,
    },
    defaultLocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    },
    defaultSearchRadius: {
        type: Number,
    },
    lastModified: {
        type: String,
        default: '',
    },
});
exports.default = mongoose_1.model('user', UserSchema);
