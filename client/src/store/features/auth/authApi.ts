import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

    
    interface AuthResponse {
      user: IUser;
    }

    export const authApi = createApi({
      reducerPath: 'authApi',
      baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
      endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
          query: (userData) => ({
            url: '/signin',
            method: 'POST',
            body: userData,
            credentials: 'include',
          }),
        }),
        register: builder.mutation<AuthResponse, { name: string; email: string; password: string; role: string }>({
          query: (userData) => ({
            url: '/signup',
            method: 'POST',
            body: userData,
            credentials: 'include',
          }),
        }),
      }),
    });

    export const { useLoginMutation, useRegisterMutation } = authApi;
