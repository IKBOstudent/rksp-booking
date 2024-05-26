export enum EUserRole {
    ADMIN = 'ADMIN',
    PARTNER = 'PARTNER',
    CLIENT = 'CLIENT',
}

export type TUserRole = keyof typeof EUserRole;

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: TUserRole;
}

export interface ILoginUserData {
    email: string;
    password: string;
}

export interface IRegisterUserData {
    name: string;
    email: string;
    password: string;
    isPartner: boolean;
}
