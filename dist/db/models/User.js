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
            required: [true, 'location is required'],
        },
        longitude: {
            type: Number,
            required: [true, 'location is required'],
        },
    },
    defaultSearchRadius: {
        type: Number,
        required: [true, 'search-radius is required'],
    },
    lastModified: {},
});
exports.default = mongoose_1.model('user', UserSchema);
