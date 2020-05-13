"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var crypto_1 = require("crypto");
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
        default: crypto_1.randomBytes(4).toString('hex'),
    },
    profilePicture: {
        type: String,
        trim: true,
    },
});
exports.default = mongoose_1.model('user', UserSchema);
