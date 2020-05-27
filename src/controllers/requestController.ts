import { Response, Request as Req } from 'express';
import { resolve } from 'path';
import { uploadRequestImages } from '../utils/uploadRequestImages';
import Request from '../db/models/Request';
import { deletePhotos } from '../utils/detelePhotos';
import { client } from '../grpc/grpc-client';
import { FindNearbyRequests } from '../types/types';
import User from '../db/models/User';
import { cloudinaryApi } from '../utils/cloudinaryConfig';
import moment from 'moment';

export const getFilteredRequests = async (req: Req, res: Response) => {
    const { userId } = req.params;
    let fetchedRequests: object[] = [];
    client.fetchRequestsNearby(
        { userId },
        async (err: string, data: FindNearbyRequests) => {
            if (err) return res.status(500).send({ err });
            if (!data.requests.length) {
                return res.status(200).send(data.requests);
            }
            const { requests } = data;
            requests.map(async ({ postId, distance }) => {
                const request = await Request.findOne({
                    _id: postId,
                    completed: false,
                }).populate({
                    path: 'requestedBy',
                    select: 'name email profilePicture',
                });
                if (request?.createdAt !== null) {
                    request!['createdAt'] = moment(request?.createdAt)
                        .add(330, 'minutes')
                        .toISOString();
                }
                fetchedRequests.push({
                    request,
                    distance: Math.ceil(distance),
                });
                if (fetchedRequests.length === requests.length) {
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
        const { location, searchRadius, _id } = newRequest;
        if (
            JSON.stringify(user?.defaultLocation) === JSON.stringify(location)
        ) {
            client.forwardRequestNearbyDefaultLocation(
                { userId, radius: searchRadius, postId: _id },
                (err: any, data: { success: boolean }) => {
                    if (err) console.log(`ERROR - ${err}`);
                    if (data.success) {
                        console.log(
                            `Created Req(default location) ${_id}`,
                            data
                        );
                    }
                }
            );
        } else {
            client.forwardRequestNearbyCustomLocation(
                { userId, location, radius: searchRadius, postId: _id },
                (err: any, data: { success: boolean }) => {
                    if (err) console.log(`ERROR - ${err}`);
                    if (data.success) {
                        console.log(
                            `Created Req(custom location) ${_id}`,
                            data
                        );
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
        const deletedImages = deletedRequest.images.map(
            (img) => `requests/${img.name}`
        );
        await cloudinaryApi.delete_resources(deletedImages);
        const user = await User.findById(deletedRequest.requestedBy);
        const { location, searchRadius, _id } = deletedRequest;
        client.deleteRequest(
            {
                userId: user?._id,
                location,
                radius: searchRadius,
                postId: _id,
            },
            (err: any, data: { success: boolean }) => {
                if (err) console.log(`ERROR - ${err}`);
                if (data.success) {
                    console.log(`Deleted request ${_id}`, data);
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
    if (requests.length === 0) {
        return res.status(200).send([]);
    } else {
        const necessaryRequestData = requests.map(
            ({
                respondedBy,
                _id,
                title,
                createdAt,
                cost,
                requestType,
                completed,
                acceptedUser,
            }) => ({
                respondedBy,
                _id,
                cost,
                createdAt: moment(createdAt).add(330, 'minutes').toISOString(),
                title,
                requestType,
                completed,
                acceptedUser,
            })
        );
        let finalData: object[] = [];
        necessaryRequestData.forEach(
            ({
                respondedBy,
                _id,
                cost,
                createdAt,
                title,
                requestType,
                completed,
                acceptedUser,
            }) => {
                User.find({ _id: { $in: respondedBy } })
                    .select('name email contactNumber profilePicture')
                    .exec(function (err, user) {
                        if (err)
                            return res.status(200).send({
                                request: { _id, cost, createdAt, title },
                                users: [],
                            });
                        finalData.push({
                            request: {
                                _id,
                                cost,
                                createdAt,
                                title,
                                requestType,
                                acceptedUser,
                                completed,
                            },
                            users: user,
                        });
                        if (finalData.length === requests.length) {
                            res.status(200).send(finalData);
                        }
                    });
            }
        );
    }
};

export const addUserToRespondedBy = async (req: Req, res: Response) => {
    const { userId, requestId } = req.params;
    await Request.findByIdAndUpdate(requestId, {
        $addToSet: { respondedBy: userId },
    });
    res.status(200).send({ success: true });
};

export const acceptUserThatResponded = async (req: Req, res: Response) => {
    const { userId, requestId } = req.params;
    await Request.findByIdAndUpdate(requestId, {
        $set: { completed: true, acceptedUser: userId },
    });
    res.status(200).send({
        success: true,
        message: `successfully accepted response of user ${userId}`,
    });
};

export const removeUserThatResponded = async (req: Req, res: Response) => {
    const { userId, requestId } = req.params;
    await Request.findByIdAndUpdate(requestId, {
        $set: { completed: false },
        $pull: { respondedBy: userId },
    });
    res.status(200).send({
        success: true,
        message: `successfully declined response of user ${userId}`,
    });
};
