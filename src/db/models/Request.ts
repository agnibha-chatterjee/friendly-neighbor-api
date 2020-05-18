import { Schema, model } from 'mongoose';
import { RequestType } from '../../types/types';
import { randomBytes } from 'crypto';

const RequestSchema = new Schema({
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
    reqUID: {
        type: String,
        unique: true,
        default: randomBytes(4).toString('hex'),
    },
    lat: {
        type: Number,
        required: [true, 'location is required'],
    },
    lng: {
        type: Number,
        required: [true, 'location is required'],
    },
    images: [
        {
            photoNumber: { type: Number },
            imageURL: { type: String },
        },
    ],
});

export default model<RequestType>('request', RequestSchema);
