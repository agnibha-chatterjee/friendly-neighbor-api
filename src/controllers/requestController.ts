import { Response, Request as Req } from 'express';
import { resolve } from 'path';
import { uploadRequestImages } from '../utils/uploadRequestImages';
import Request from '../db/models/Request';
import { deletePhotos } from '../utils/detelePhotos';
import { client } from '../grpc/grpc-client';
import { FindNearbyRequests } from '../types/types';

export const getFilteredRequests = async (req: Req, res: Response) => {
    const { userId } = req.params;
    client.fetchRequestsNearby(
        { userId },
        async (err: string, data: FindNearbyRequests) => {
            if (err) console.log(err);
            const { requests } = data;
            const ids = requests.map(({ postId }) => postId);
            const posts = await Request.find(
                {
                    reqUID: { $in: ids },
                },
                { searchRadius: 0 }
            ).populate({
                path: 'requestedBy',
                select: 'name email profilePicture',
            });
            res.status(200).send(posts);
        }
    );
};

export const createRequest = async (req: Req, res: Response) => {
    console.log(req.body);
    console.log(JSON.parse(req.body.data));
    // // const location = { latitude: 28.38, longitude: 77.12 };
    // // const radius = 1;
    // // const postId = 'bd242777';
    // // client.forwardRequestNearbyDefaultLocation(
    // //     { userId, location, radius, postId },
    // //     (err: any, data: any) => {
    // //         if (err) throw err;
    // //         console.log(data);
    // //         res.json(data);
    // //     }
    // // );
    // let files: Express.Multer.File[] = [];
    // const data = JSON.parse(req.body.data);
    // const newRequest = await Request.create(data);
    // if (newRequest._id) {
    //     res.status(201).send(newRequest);
    //     if (req.files) {
    //         files = Object.keys(req.files).map((fieldname: string) => {
    //             // @ts-ignore
    //             return req.files[fieldname][0];
    //         });
    //         await uploadRequestImages(files, newRequest._id);
    //         deletePhotos(resolve(__dirname, `../../uploads/`));
    //     }
    // } else {
    //     res.status(500).send({ error: 'error creating request' });
    // }
    res.json({ hi: 'testing' });
};

export const deleteRequest = async (req: Req, res: Response) => {
    const { requestId } = req.params;
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (deletedRequest) {
        res.status(200).send({
            success: true,
            message: 'request was successfully deleted',
        });
    } else {
        res.status(500).send({
            success: false,
            message: 'error deleting request',
        });
    }
};

export const getRequestHistory = async (req: Req, res: Response) => {
    const { userId } = req.params;
    const requests = await Request.find({ requestedBy: userId });
    res.status(200).send(requests);
};
