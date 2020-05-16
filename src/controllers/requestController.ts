import { Response, Request as Req } from 'express';
import { resolve } from 'path';
import { uploadRequestImages } from '../utils/uploadRequestImages';
import { CustomRequest } from '../types/types';
import Request from '../db/models/Request';
import { deletePhotos } from '../utils/detelePhotos';

export const createRequest = async (req: Req, res: Response) => {
    let files: Express.Multer.File[] = [];
    const data = JSON.parse(req.body);
    const newRequest = await Request.create(data);
    if (newRequest._id) {
        res.status(201).send(newRequest);
        if (req.files) {
            files = Object.keys(req.files).map((fieldname: string) => {
                // @ts-ignore
                return req.files[fieldname][0];
            });
            await uploadRequestImages(files, newRequest._id);
            deletePhotos(resolve(__dirname, `../../uploads/`));
        }
    } else {
        res.status(500).send({ error: 'error creating request' });
    }
};
