import { Request, Response } from 'express';
import { User } from '../db/models/user';
import { uploader } from '../utils/cloudinary-config';
import { resolve } from 'path';
import { compressImage } from '../utils/compress-image';
import { deletePhotos } from '../utils/detele-photos';
import moment from 'moment';
import { NotFoundError } from '../errors/not-found-error';
import { saveUserLocation } from '../grpc/grpc-functions/save-user-location';

interface LoginOrSignUpData {
  _id: string;
  contactNumber: string;
  uuid: string;
}

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: string;
  defaultLocation: { latitude: number; longitude: number };
  defaultSearchRadius: number;
  _id: string;
}

export const loginOrSignUp = async (
  req: Request<any, any, LoginOrSignUpData>,
  res: Response
) => {
  const { _id, uuid } = req.body;
  console.log(uuid);
  const user = await User.findById(_id);
  if (user) {
    if (user.uuid && user.uuid !== uuid) {
      return res
        .status(200)
        .send({ newUser: false, user, isAlreadySignedIn: true });
    }
    user.set({ uuid });
    await user.save();
    res.status(200).send({ newUser: false, user, isAlreadySignedIn: false });
  } else {
    const newUser = User.build(req.body);
    await newUser.save();
    res
      .status(201)
      .send({ newUser: true, user: newUser, isAlreadySignedIn: false });
  }
};

export const registerUser = async (
  req: Request<any, any, RegisterUserData>,
  res: Response
) => {
  const {
    firstName,
    lastName,
    email,
    username,
    defaultLocation,
    address,
    defaultSearchRadius,
    _id,
  } = req.body;
  await User.findByIdAndUpdate(_id, {
    $set: {
      firstName,
      lastName,
      email,
      username,
      defaultLocation,
      address,
      defaultSearchRadius,
    },
  });
  const user = await User.findById(_id).select({
    defaultLocation: 0,
    defaultSearchRadius: 0,
    address: 0,
  });
  if (user?.email && user?.username && user?.lastName && user?.firstName) {
    res.status(201).send({ success: true, user });
  } else {
    res.status(500).send({ success: false });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {
    name,
    contactNumber,
    address,
    defaultLocation,
    defaultSearchRadius,
  } = req.file ? JSON.parse(req.body.data) : req.body;
  const user = await User.findById(userId);
  if (name !== user?.username) {
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
          error: 'You can change your name every 365 days. Please try again!',
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
        name,
        contactNumber,
        defaultLocation,
        defaultSearchRadius,
        address,
      },
    });
    res.status(200).send({ success: true });
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
        if (error) console.log(`CLOUDINARY-ERROR - ${error}`);
        res.status(200).send({
          profilePicture: result?.secure_url,
          success: true,
        });
        await User.findByIdAndUpdate(userId, {
          $set: {
            profilePicture: result?.secure_url,
            cloudinaryPublicId: result?.public_id,
            name,
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
 saveUserLocation({
      userId: user?._id,
      location: defaultLocation,
      radius: defaultSearchRadius,
    })
};

export const getUserData = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError();
  }
  if (user.lastModified === '') {
    return res.status(200).send({ user, canChangeName: true });
  } else {
    const daysSinceLastEdit = moment().diff(moment(user.lastModified), 'days');
    if (daysSinceLastEdit < 365) {
      return res.status(200).send({ user, canChangeName: false });
    } else {
      return res.status(200).send({ user, canChangeName: true });
    }
  }
};

export const signUserOut = async (req: Request, res: Response) => {
  const { _id } = req.body;
  const user = await User.findById(_id);
  if (!user) {
    throw new NotFoundError();
  }
  user.set({
    uuid: '',
  });
  await user.save();
  res.status(200).send({ success: true });
};
