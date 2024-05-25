import { $Enums } from '@prisma/client';

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: $Enums.Role;
}

export interface ITokenData {
    id: number;
    role: string;
}
