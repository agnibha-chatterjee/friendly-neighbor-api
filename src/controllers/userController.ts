import { Request, Response } from 'express';
import User from '../db/models/User';
import { CustomRequest } from '../types/types';
import { OAuth2Client } from 'google-auth-library';

interface loginOrSignUpData {
  idToken: string;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginOrSignUp = async (
  req: CustomRequest<loginOrSignUpData, {}>,
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

export const postUserCoordinates = async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).send(req.body);
};
