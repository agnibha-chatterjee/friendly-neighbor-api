/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
import sharp from 'sharp';
export declare const compressImage: (userId: string, file: Express.Multer.File) => Promise<sharp.OutputInfo>;
