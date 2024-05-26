import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBookData, IHotel, IReservation, ISearchParams } from './types';

export const hotelsApi = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URI,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getHotels: builder.query<{ hotels: IHotel[] }, void>({
            query: () => '/hotels',
        }),
        searchHotels: builder.query<{ hotels: IHotel[] }, ISearchParams>({
            query: (searchParams) => ({
                url: '/hotels/search',
                params: searchParams,
            }),
        }),
        addHotel: builder.mutation<{ hotel: IHotel }, IHotel>({
            query: (newHotel) => ({
                url: '/hotels',
                method: 'POST',
                body: newHotel,
            }),
        }),
        bookHotel: builder.mutation<{ reservation: IReservation }, IBookData>({
            query: (reservationData) => ({
                url: '/book',
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
