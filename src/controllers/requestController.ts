import { Response } from 'express';
import { resolve } from 'path';
import { uploadRequestImages } from '../utils/uploadRequestImages';
import { CustomRequest } from '../types/types';
import Request from '../db/models/Request';
import { deletePhotos } from '../utils/detelePhotos';

export const createRequest = async (
    req: CustomRequest<{ data: string }, {}>,
    res: Response
) => {
    const newRequest = await Request.create(JSON.parse(req.body.data));
    if (newRequest._id) {
        res.status(201).send(newRequest);
        if (req.files.length) {
            await uploadRequestImages(req.files, newRequest._id);
            deletePhotos(resolve(__dirname, `../../uploads/`));
        }
    } else {
        res.status(500).send({ error: 'error creating request' });
    }
};
