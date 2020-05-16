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
    images: Array<{ imageURL: string; photoNumber: number }>;
}

export interface CustomRequest<T, S> extends Request {
    body: T;
    headers: S & IncomingHttpHeaders;
}
