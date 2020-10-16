import { Model, Document } from 'mongoose';
import { RequestType } from '../../types/types';
interface RequestAttrs {
    _id: string;
}
interface RequestDoc extends Document {
    requestType: RequestType;
    requestedBy: string;
    title: string;
    description: string;
    expiration: Date;
    createdAt: Date;
    contactNumber: string;
    searchRadius: number;
    completed: boolean;
    location: Location;
    cost: number;
    images: string[];
    respondedBy: string[];
    acceptedUser: string;
}
interface RequestModel extends Model<RequestDoc> {
    build(attrs: RequestAttrs): RequestDoc;
}
declare const Request: RequestModel;
export { Request };
