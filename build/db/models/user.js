"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
    },
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            //@ts-ignore
            partialFilterExpression: { email: { $type: 'string' } },
        },
        default: null
    },
    username: {
        type: String,
        default: '',
    },
    profilePicture: {
        type: String,
        trim: true,
        default: '',
    },
    contactNumber: {
        type: String,
        trim: true,
        required: [true, 'contact-number is required'],
        unique: true,
    },
    address: {
        type: String,
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
    uuid: {
        type: String,
        trim: true,
    },
}, {
    _id: false,
});
userSchema.statics.build = function (attrs) {
    return new User({
        _id: attrs._id,
        uuid: attrs.uuid,
        contactNumber: attrs.contactNumber,
    });
};
var User = mongoose_1.model('user', userSchema);
exports.User = User;
