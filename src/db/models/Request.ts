import { Schema, model } from 'mongoose';
import { RequestType } from '../../types/types';
import { generate } from 'shortid';

const RequestSchema = new Schema({
    requestType: {
        type: { String },
    },
    requestedBy: {
        type: Schema.Types.ObjectId,
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

export default model<RequestType>('request', RequestSchema);
