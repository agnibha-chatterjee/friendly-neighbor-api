import { v2 } from 'cloudinary';
declare const uploader: typeof v2.uploader, cloudinaryApi: typeof v2.api;
declare const initializeCloudinary: () => void;
export { uploader, initializeCloudinary, cloudinaryApi };
