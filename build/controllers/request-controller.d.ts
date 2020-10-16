import { Response, Request as Req } from 'express';
export declare const getFilteredRequests: (req: Req, res: Response) => Promise<void>;
export declare const createRequest: (req: Req, res: Response) => Promise<void>;
export declare const deleteRequest: (req: Req, res: Response) => Promise<void>;
export declare const getRequestHistory: (req: Req, res: Response) => Promise<Response<any> | undefined>;
export declare const addUserToRespondedBy: (req: Req, res: Response) => Promise<void>;
export declare const acceptUserThatResponded: (req: Req, res: Response) => Promise<void>;
export declare const removeUserThatResponded: (req: Req, res: Response) => Promise<void>;
