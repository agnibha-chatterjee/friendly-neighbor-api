/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
export declare const uploadRequestImages: (images: {
    [fieldname: string]: Express.Multer.File[];
} | Express.Multer.File[], reqId: string) => Promise<unknown>;
