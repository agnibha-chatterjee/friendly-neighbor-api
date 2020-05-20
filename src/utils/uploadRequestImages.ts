import { uploader } from './cloudinaryConfig';
import { resolve as pathResolve } from 'path';
import Request from '../db/models/Request';
import cuid from 'cuid';

type Photos = Array<{ imageURL: string; name: string }>;

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
        images.map(async (image: Express.Multer.File) => {
            const fileName = cuid();
            const i = await uploader.upload(
                pathResolve(__dirname, `../../uploads/${image.originalname}`),
                {
                    resource_type: 'image',
                    public_id: `requests/${fileName}`,
                    overwrite: true,
                }
            );
            if (i.secure_url) {
                photos = [
                    ...photos,
                    { imageURL: i.secure_url, name: fileName },
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
