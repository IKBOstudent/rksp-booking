import { Role } from '@prisma/client';
import { Request } from 'express';

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: Role;
}

export interface ITokenData {
    id: number;
    role: string;
}

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: Role;
    };
}
