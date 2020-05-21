import { Schema, model } from 'mongoose';
import { User } from '../../types/types';
import { generate } from 'shortid';

const UserSchema = new Schema({
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
        default: generate,
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
        address1: { type: String, trim: true },
        address2: { type: String, trim: true },
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
    lastModified:{

    }
});

export default model<User>('user', UserSchema);
