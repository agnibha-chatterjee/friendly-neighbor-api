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
        addr: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    cloudinaryPublicId: string;
    defaultLocation: {
        latitude: number;
        longitude: number;
    };
    defaultSearchRadius: number;
    lastModified: Date | string;
    canChangeName: boolean;
}

export interface RequestType extends Document {
    requestType: string;
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
    distance: number;
    respondedBy: Array<string>;
    acceptedUser: string;
}

export interface CustomRequest<T, S> extends Request {
    body: T;
    headers: S & IncomingHttpHeaders;
}

export type FindNearbyRequests = {
    requests: Array<{
        postId: string;
        distance: number;
    }>;
    metaResult: {
        success: boolean;
    };
};
