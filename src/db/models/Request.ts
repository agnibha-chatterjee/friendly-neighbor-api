import mongoose, { Schema, model, Model, Document } from 'mongoose';
import { RequestType, OrderStatus } from '../../types/types';

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
  orderStatus: OrderStatus;
}

interface RequestModel extends Model<RequestDoc> {
  build(attrs: RequestAttrs): RequestDoc;
}

const requestSchema = new Schema({
  requestType: {
    type: String,
    enum: Object.values(RequestType),
  },
  requestedBy: {
    type: String,
    required: [true, 'RequestId is required'],
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
  orderStatus: {
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created,
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
    default: '',
    required: false,
    ref: 'user',
  },
});

const Request = model<RequestDoc, RequestModel>('Request', requestSchema);

export { Request };
