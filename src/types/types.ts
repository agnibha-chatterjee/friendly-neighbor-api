import { Request } from 'express';
import { Document } from 'mongoose';
import { IncomingHttpHeaders } from 'http';

export interface User extends Document {
    name: string;
    email: string;
    googleId: string;
    profilePicture: string;
}

export interface CustomRequest<T, S> extends Request {
    body: T;
    headers: S & IncomingHttpHeaders;
}
