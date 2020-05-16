import { uploader } from './cloudinaryConfig';
import { resolve as pathResolve } from 'path';
import { unlinkSync } from 'fs';
import Request from '../db/models/Request';

type Photos = Array<{ imageURL: string; photoNumber: number }>;

export const uploadRequestImages = (
    images:
        | Express.Multer.File[]
        | {
              [fieldname: string]: Express.Multer.File[];
          },
    reqId: string
) => {
    let photos: Photos = [];
    return new Promise((resolve, reject) => {
        //@ts-ignore
        images.map(async (image: Express.Multer.File, index: number) => {
            const i = await uploader.upload(
                pathResolve(__dirname, `../../uploads/${image.originalname}`),
                {
                    resource_type: 'image',
                    public_id: `requests/${reqId}/photo-${index + 1}`,
                    overwrite: true,
                }
            );
            if (i.secure_url) {
                photos = [
                    ...photos,
                    { imageURL: i.secure_url, photoNumber: index + 1 },
                ];
                if (photos.length === images.length) {
                    Request.findByIdAndUpdate(reqId, {
                        $set: { images: photos },
                    }).exec();
                    resolve('done');
                    return;
                }
            } else {
                reject('Error uploading photos');
            }
        });
    });
};
