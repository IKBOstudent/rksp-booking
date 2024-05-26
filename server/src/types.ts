import { Role } from '@prisma/client';

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
