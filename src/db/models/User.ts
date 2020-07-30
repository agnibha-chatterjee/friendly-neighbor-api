import { Schema, model } from 'mongoose';
import { User } from '../../types/types';

const UserSchema = new Schema(
    {
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
            unique: true,
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
    },
    {
        _id: false,
    }
);

export default model<User>('user', UserSchema);
