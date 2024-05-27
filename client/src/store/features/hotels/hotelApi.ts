import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IBookData,
    IHotel,
    IReservation,
    ISearchParams,
    Suggestion,
} from './types';

export const hotelsApi = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DEV_SERVER,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getHotels: builder.query<{ hotels: IHotel[] }, void>({
            query: () => '/api/hotels',
        }),
        searchHotels: builder.mutation<{ hotels: IHotel[] }, ISearchParams>({
            query: (searchParams) => ({
                url: '/api/search_hotels',
                method: 'GET',
                params: searchParams,
            }),
        }),
        addHotel: builder.mutation<{ hotel: IHotel }, IHotel>({
            query: (newHotel) => ({
                url: '/api/hotels',
                method: 'POST',
                body: newHotel,
            }),
        }),
        bookHotel: builder.mutation<{ reservation: IReservation }, IBookData>({
            query: (reservationData) => ({
                url: '/api/book',
                method: 'POST',
                body: reservationData,
            }),
        }),
        suggestHotels: builder.query<{ suggestions: Suggestion[] }, string>({
            query: (input) => ({
                url: '/suggest_hotels',
                params: { input },
            }),
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useSearchHotelsMutation,
    useAddHotelMutation,
    useBookHotelMutation,
    useSuggestHotelsQuery,
} = hotelsApi;
