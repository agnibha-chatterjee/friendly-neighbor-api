import { Request } from 'express';
import { Document } from 'mongoose';
import { IncomingHttpHeaders } from 'http';

export interface User extends Document {
    name: string;
    email: string;
    googleId: string;
    profilePicture: string;
    contactNumber: string;
    address: {
        address1: string;
        address2: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    cloudinaryPublicId: string;
    uid: string;
    defaultLocation: {
        latitude: string;
        longitude: string;
    };
    defaultSearchRadius: number;
}

export interface RequestType extends Document {
    requestedBy: string;
    title: string;
    description: string;
    expiration: Date | string;
    createdAt: Date | string;
    contactNumber: string;
    searchRadius: number;
    completed: boolean;
    images: Array<{ imageURL: string; name: string }>;
    location: {
        latitude: string;
        longitude: string;
    };
    cost: number;
    reqUID: string;
}

export interface CustomRequest<T, S> extends Request {
    body: T;
    headers: S & IncomingHttpHeaders;
}

export type FindNearbyRequests = {
    requests: [
        {
            postId: string;
        }
    ];
    metaResult: {
        success: boolean;
    };
};
