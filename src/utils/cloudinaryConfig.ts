import { v2 } from 'cloudinary';
const { config, uploader } = v2;
const initializeCloudinary = () =>
    config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

export { uploader, initializeCloudinary };
