import { Request, Response } from 'express';
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
    defaultLocation: {
        latitude: number;
        longitude: number;
    };
    defaultSearchRadius: number;
    _id: string;
}
export declare const loginOrSignUp: (req: Request<any, any, LoginOrSignUpData>, res: Response) => Promise<Response<any> | undefined>;
export declare const registerUser: (req: Request<any, any, RegisterUserData>, res: Response) => Promise<void>;
export declare const updateProfile: (req: Request, res: Response) => Promise<Response<any> | undefined>;
export declare const getUserData: (req: Request, res: Response) => Promise<Response<any>>;
export declare const signUserOut: (req: Request, res: Response) => Promise<void>;
export {};
