import { Request, Response } from 'express';
import User from '../db/models/User';
import { CustomRequest } from '../types/types';
import { OAuth2Client } from 'google-auth-library';
import { uploader } from '../utils/cloudinaryConfig';
import { resolve } from 'path';
import { compressImage } from '../utils/compressImage';
import { deletePhotos } from '../utils/detelePhotos';
import moment from 'moment';
import { client } from '../grpc/grpc-client';

interface LoginOrSignUpData {
    idToken: string;
}

interface RegisterUserData {
    id: string;
    contactNumber: string;
    address: {
        addr: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    defaultLocation: { latitude: number; longitude: number };
    defaultSearchRadius: number;
}

const Gclient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginOrSignUp = async (
    req: CustomRequest<LoginOrSignUpData, {}>,
    res: Response
) => {
    const { idToken } = req.body;

    const ticket = await Gclient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID!,
    });
    const payload = ticket.getPayload();
    if (payload !== undefined) {
        const { email, name, picture, sub } = payload;
        const newUser = {
            email,
            name,
            profilePicture: picture,
            googleId: sub,
        };
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(200).send({ newUser: false, user: existingUser });
        } else {
            const user = await User.create(newUser);
            res.status(201).send({ newUser: true, user });
        }
    } else {
        res.status(406).send({ error: 'invalid token' });
    }
};

export const registerUser = async (
    req: CustomRequest<RegisterUserData, {}>,
    res: Response
) => {
    const {
        address,
        defaultSearchRadius,
        defaultLocation,
        contactNumber,
        id,
    } = req.body;
    const registeredUser = await User.findByIdAndUpdate(id, {
        $set: { address, defaultLocation, defaultSearchRadius, contactNumber },
    });
    res.status(201).send(registeredUser);
    client.saveUserLocation(
        {
            userId: registeredUser?.uid,
            location: registeredUser?.defaultLocation,
            radius: defaultSearchRadius,
        },
        (err: any, data: { success: boolean }) => {
            if (err) console.log(`ERROR - ${err}`);
            if (data.success) {
                console.log(`Registered user ${registeredUser?.uid}`, data);
            }
        }
    );
};

export const updateProfile = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const {
        name,
        contactNumber,
        address,
        defaultLocation,
        defaultSearchRadius,
        email,
    } = JSON.parse(req.body.data);
    const user = await User.findById(userId);
    if (name !== user?.name) {
        if (user?.lastModified === '') {
            await User.findByIdAndUpdate(userId, {
                $set: { name, lastModified: moment().toISOString() },
            });
        } else {
            const daysSinceLastEdit = moment().diff(
                moment(user?.lastModified),
                'days'
            );
            if (daysSinceLastEdit < 365) {
                return res.send({
                    error:
                        'You can change your name every 365 days. Please try again!',
                });
            } else {
                await User.findByIdAndUpdate(userId, {
                    $set: { name, lastModified: moment().toISOString() },
                });
            }
        }
    }
    if (!req.file) {
        await User.findByIdAndUpdate(userId, {
            $set: {
                email,
                contactNumber,
                defaultLocation,
                defaultSearchRadius,
                address,
            },
        });
        return res.status(200).send({ success: true });
    } else {
        await compressImage(userId, req.file);
        uploader.upload(
            resolve(
                __dirname,
                `../../uploads/${userId}-${req.file.originalname}.jpeg`
            ),
            {
                resource_type: 'image',
                public_id: `profilePhotos/${userId}`,
                overwrite: true,
            },
            async (error, result) => {
                if (error) throw error;
                res.status(200).send({
                    profilePicture: result?.secure_url,
                    success: true,
                });
                await User.findByIdAndUpdate(userId, {
                    $set: {
                        profilePicture: result?.secure_url,
                        cloudinaryPublicId: result?.public_id,
                        email,
                        contactNumber,
                        defaultLocation,
                        defaultSearchRadius,
                        address,
                    },
                });
                deletePhotos(resolve(__dirname, `../../uploads/`));
            }
        );
    }
    client.saveUserLocation(
        {
            userId: user?.uid,
            location: defaultLocation,
            radius: defaultSearchRadius,
        },
        (err: string, data: { success: boolean }) => {
            if (err) console.log(`ERROR - ${err}`);
            if (data.success) {
                console.log(`Updated user - ${user?.uid}`, data);
            }
        }
    );
};

export const getUserData = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user?.lastModified === '') {
        return res.status(200).send({ user, canChangeName: true });
    } else {
        const daysSinceLastEdit = moment().diff(
            moment(user?.lastModified),
            'days'
        );
        if (daysSinceLastEdit < 365) {
            return res.status(200).send({ user, canChangeName: false });
        } else {
            return res.status(200).send({ user, canChangeName: true });
        }
    }
};
