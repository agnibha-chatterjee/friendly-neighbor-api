import { resolve } from 'path';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = resolve(__dirname, '../../proto/fn_core.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const FnCore = grpc.loadPackageDefinition(packageDefinition).FnCore;

//@ts-ignore
export const client = new FnCore(
    'localhost:9120',
    grpc.credentials.createInsecure()
);
