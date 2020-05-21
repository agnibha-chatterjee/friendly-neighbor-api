import { Response, Request as Req } from 'express';
import { resolve } from 'path';
import { uploadRequestImages } from '../utils/uploadRequestImages';
import Request from '../db/models/Request';
import { deletePhotos } from '../utils/detelePhotos';
import { client } from '../grpc/grpc-client';
import { FindNearbyRequests } from '../types/types';
import User from '../db/models/User';

export const getFilteredRequests = async (req: Req, res: Response) => {
    const { userId } = req.params;
    let fetchedRequests: object[] = [];
    client.fetchRequestsNearby(
        { userId },
        async (err: string, data: FindNearbyRequests) => {
            if (err) console.log(err);
            const { requests } = data;
            requests.map(async ({ postId, distance }) => {
                const request = await Request.findOne({
                    reqUID: postId,
                }).populate({
                    path: 'requestedBy',
                    select: 'name email profilePicture',
                });
                fetchedRequests.push({
                    request,
                    distance: Math.ceil(distance),
                });
                if (fetchedRequests.length === requests.length) {
                    res.status(200).send(fetchedRequests);
                } else if (fetchedRequests.length === 0) {
                    res.status(200).send(fetchedRequests);
                }
            });
        }
    );
};

export const createRequest = async (req: Req, res: Response) => {
    let files: Express.Multer.File[] = [];
    const data = JSON.parse(req.body.data);
    data['location'] = JSON.parse(data['location']);
    data['cost'] = parseInt(data['cost']);
    const userId = req.body.uid;
    const newRequest = await Request.create(data);
    if (newRequest._id) {
        res.status(201).send(newRequest);
        if (Object.keys(req.files).length > 0) {
            files = Object.keys(req.files).map((fieldname: string) => {
                // @ts-ignore
                return req.files[fieldname][0];
            });
            await uploadRequestImages(files, newRequest._id);
            deletePhotos(resolve(__dirname, `../../uploads/`));
        }
        const user = await User.findById(newRequest.requestedBy);
        const { location, searchRadius, reqUID } = newRequest;
        if (
            JSON.stringify(user?.defaultLocation) === JSON.stringify(location)
        ) {
            client.forwardRequestNearbyDefaultLocation(
                { userId, location, radius: searchRadius, postId: reqUID },
                (err: any, data: { success: boolean }) => {
                    if (err) throw err;
                    if (data.success) {
                        res.end();
                    }
                }
            );
        } else {
            client.forwardRequestNearbyCustomLocation(
                { userId, location, radius: searchRadius, postId: reqUID },
                (err: any, data: { success: boolean }) => {
                    if (err) throw err;
                    if (data.success) {
                        res.end();
                    }
                }
            );
        }
    } else {
        res.status(500).send({ error: 'error creating request' });
    }
};

export const deleteRequest = async (req: Req, res: Response) => {
    const { requestId } = req.params;
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (deletedRequest) {
        res.status(200).send({
            success: true,
            message: 'request was successfully deleted',
        });
        const user = await User.findById(deletedRequest.requestedBy);
        const { location, searchRadius, reqUID } = deletedRequest;
        client.deleteRequest(
            {
                userId: user?.uid,
                location,
                radius: searchRadius,
                postId: reqUID,
            },
            (err: any, data: { success: boolean }) => {
                if (err) throw err;
                console.log(data);
                if (data.success) {
                    res.end();
                }
            }
        );
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
