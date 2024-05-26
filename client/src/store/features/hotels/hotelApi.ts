import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBookData, IHotel, IReservation, ISearchParams } from './types';

export const hotelsApi = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getHotels: builder.query<{ hotels: IHotel[] }, void>({
            query: () => '/api/hotels',
        }),
        searchHotels: builder.query<{ hotels: IHotel[] }, ISearchParams>({
            query: (searchParams) => ({
                url: '/api/hotels/search',
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
    }),
});

export const {
    useGetHotelsQuery,
    useSearchHotelsQuery,
    useAddHotelMutation,
    useBookHotelMutation,
} = hotelsApi;
