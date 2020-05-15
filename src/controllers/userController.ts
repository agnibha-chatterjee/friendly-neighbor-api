import { Request, Response } from 'express';
import User from '../db/models/User';
import { CustomRequest } from '../types/types';
import { OAuth2Client } from 'google-auth-library';
import { uploader } from '../utils/cloudinaryConfig';
import { resolve } from 'path';
import { unlinkSync } from 'fs';
import { compressImage } from '../utils/compressImage';
import { deleteProfilePhotos } from '../utils/deteleProfilePhotos';

interface LoginOrSignUpData {
    idToken: string;
}

interface RegisterUserData {
    id: string;
    contactNumber: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginOrSignUp = async (
    req: CustomRequest<LoginOrSignUpData, {}>,
    res: Response
) => {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID!,
    });
    const payload = ticket.getPayload();
    if (payload !== undefined) {
        const { email, name, picture, sub } = payload;
        const newUser = { email, name, profilePicture: picture, googleId: sub };
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
        contactNumber,
        address1,
        address2,
        city,
        country,
        pincode,
        state,
        id,
    } = req.body;
    const address = { address1, address2, city, country, pincode, state };
    const registeredUser = await User.findByIdAndUpdate(id, {
        $set: { address, contactNumber },
    });
    res.status(201).send(registeredUser);
};

export const updateProfilePhoto = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const checkIfProfilePhotoExists = await User.findById(userId);
    if (checkIfProfilePhotoExists?.cloudinaryPublicId) {
        await uploader.destroy(checkIfProfilePhotoExists?.cloudinaryPublicId);
    }
    const img = await compressImage(userId, req.file);
    if (img) {
        uploader.upload(
            resolve(
                __dirname,
                `../../uploads/${userId}-${req.file.originalname}.jpeg`
            ),
            async (error, result) => {
                if (error) return res.send(error);
                res.send({ url: result?.secure_url });
                await User.findByIdAndUpdate(userId, {
                    $set: {
                        profilePicture: result?.secure_url,
                        cloudinaryPublicId: result?.public_id,
                    },
                });
                deleteProfilePhotos(userId, req.file);
            }
        );
    }
};

export const postUserCoordinates = async (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send(req.body);
};
