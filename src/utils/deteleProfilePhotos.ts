import { unlinkSync } from 'fs';
import { resolve } from 'path';

export const deleteProfilePhotos = (
    userId: string,
    file: Express.Multer.File
) => {
    unlinkSync(
        resolve(__dirname, `../../uploads/${userId}-${file.originalname}`)
    );
    unlinkSync(
        resolve(__dirname, `../../uploads/${userId}-${file.originalname}.jpeg`)
    );
};
