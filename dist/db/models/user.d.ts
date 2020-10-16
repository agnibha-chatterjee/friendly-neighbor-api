import { Model, Document } from 'mongoose';
import { Location } from '../../types/types';
interface UserAttrs {
    _id: string;
    uuid: string;
    contactNumber: string;
}
interface UserDoc extends Document {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePicture: string;
    contactNumber: string;
    address: string;
    defaultLocation: Location;
    defaultSearchRadius: number;
    lastModified: string;
    uuid: string;
}
interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}
declare const User: UserModel;
export { User };
