import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EUserRole, IUser, ILoginUserData, IRegisterUserData } from './types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ user: IUser }, ILoginUserData>({
            query: ({ email, password }) => ({
                url: '/api/signin',
                method: 'POST',
                body: { email, password },
            }),
        }),
        register: builder.mutation<{ user: IUser }, IRegisterUserData>({
            query: ({ name, email, password, isPartner }) => ({
                url: '/api/signup',
                method: 'POST',
                body: {
                    name,
                    email,
                    password,
                    role: isPartner ? EUserRole.PARTNER : EUserRole.CLIENT,
                },
            }),
        }),
        profile: builder.query<{ user: IUser }, void>({
            query: () => '/api/profile',
        }),
        users: builder.query<{ users: IUser[] }, void>({
            query: () => '/api/users',
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useProfileQuery,
    useUsersQuery,
} = authApi;
