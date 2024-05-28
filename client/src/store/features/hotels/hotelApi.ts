import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IReservationData,
    IFeature,
    IFeatureData,
    IHotel,
    IHotelData,
    IReservation,
    IRoom,
    IRoomData,
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
        addHotel: builder.mutation<{ hotel: IHotel }, IHotelData>({
            query: (newHotel) => ({
                url: '/api/hotel',
                method: 'POST',
                body: newHotel,
            }),
        }),
        updateHotel: builder.mutation<
            { hotel: IHotel },
            { id: number; hotelData: Partial<IHotelData> }
        >({
            query: ({ id, hotelData }) => ({
                url: `/api/hotel/${id}`,
                method: 'PUT',
                body: hotelData,
            }),
        }),
        deleteHotel: builder.mutation<{}, number>({
            query: (id) => ({
                url: `/api/hotel/${id}`,
                method: 'DELETE',
            }),
        }),
        addFeature: builder.mutation<{ feature: IFeature }, IFeatureData>({
            query: (newFeature) => ({
                url: '/api/hotel_feature',
                method: 'POST',
                body: newFeature,
            }),
        }),
        deleteFeature: builder.mutation<{}, number>({
            query: (id) => ({
                url: `/api/hotel_feature/${id}`,
                method: 'DELETE',
            }),
        }),
        addRoom: builder.mutation<{ room: IRoom }, IRoomData>({
            query: (newRoom) => ({
                url: '/api/hotel_room',
                method: 'POST',
                body: newRoom,
            }),
        }),
        deleteRoom: builder.mutation<{}, number>({
            query: (id) => ({
                url: `/api/hotel_room/${id}`,
                method: 'DELETE',
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
        bookHotel: builder.mutation<
            { reservation: IReservation },
            IReservationData
        >({
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
