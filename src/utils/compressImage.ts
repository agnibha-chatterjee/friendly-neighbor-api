import sharp from 'sharp';
import { resolve } from 'path';

export const compressImage = async (
    userId: string,
    file: Express.Multer.File
) => {
    const img = sharp(
        resolve(__dirname, `../../uploads/${userId}-${file.originalname}`)
    )
        .toFormat('jpeg')
        .jpeg({
            quality: 80,
            overshootDeringing: true,
            progressive: true,
            optimizeCoding: true,
            force: true,
        })
        .toFile(
            resolve(
                __dirname,
                `../../uploads/${userId}-${file.originalname}.jpeg`
            )
        );
    return img;
};
