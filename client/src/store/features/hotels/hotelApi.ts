import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IBookData,
    IHotel,
    IReservation,
    ISearchParams,
    ISuggestion,
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
        addHotel: builder.mutation<{ hotel: IHotel }, IHotel>({
            query: (newHotel) => ({
                url: '/api/hotels',
                method: 'POST',
                body: newHotel,
            }),
        }),
        searchHotels: builder.mutation<{ hotels: IHotel[] }, ISearchParams>({
            query: (searchParams) => ({
                url: '/api/search_hotels',
                method: 'GET',
                params: searchParams,
            }),
        }),
        suggestHotels: builder.mutation<{ suggestions: ISuggestion[] }, string>(
            {
                query: (input) => ({
                    url: '/api/suggest_hotels',
                    method: 'GET',
                    params: { input },
                }),
            },
        ),
        bookHotel: builder.mutation<{ reservation: IReservation }, IBookData>({
            query: (bookData) => ({
                url: '/api/book',
                method: 'POST',
                body: bookData,
            }),
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useSearchHotelsMutation,
    useAddHotelMutation,
    useBookHotelMutation,
    useSuggestHotelsMutation,
} = hotelsApi;
