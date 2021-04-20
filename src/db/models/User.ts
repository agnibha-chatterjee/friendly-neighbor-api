import { Schema, model, Model, Document } from 'mongoose';
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
  karmaPoints: number;
  completedRequests: number;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema(
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
      index: {
        unique: true,
        //@ts-ignore
        partialFilterExpression: { email: { $type: 'string' } },
      },
      default: '',
    },
    username: {
      type: String,
      default: '',
    },
    profilePicture: {
      type: String,
      trim: true,
      default: 'https://via.placeholder.com/300/09f/fff.png',
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
    uuid: {
      type: String,
      trim: true,
    },
    karmaPoints: {
      type: Number,
      default: 100,
    },
    completedRequests: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs._id,
    uuid: attrs.uuid,
    contactNumber: attrs.contactNumber,
  });
};

const User = model<UserDoc, UserModel>('user', userSchema);

export { User };
