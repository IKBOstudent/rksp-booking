import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    BookPayload,
    FeaturePayload,
    HotelPayload,
    IFeature,
    IHotel,
    IReservation,
    IRoom,
    ISearchParams,
    ISuggestion,
    RoomPayload,
} from './types';

export const hotelsApi = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_DEV_SERVER,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getHotel: builder.query<{ hotel: IHotel }, number>({
            query: (id) => `/api/hotel/${id}`,
        }),
        addHotel: builder.mutation<{ hotel: IHotel }, HotelPayload>({
            query: (newHotel) => ({
                url: '/api/hotel',
                method: 'POST',
                body: newHotel,
            }),
        }),
        updateHotel: builder.mutation<
            { hotel: IHotel },
            { id: number; hotelData: Partial<HotelPayload> }
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
        addFeature: builder.mutation<{ feature: IFeature }, FeaturePayload>({
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
        addRoom: builder.mutation<{ room: IRoom }, RoomPayload>({
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
        bookHotel: builder.mutation<{ reservation: IReservation }, BookPayload>(
            {
                query: (bookData) => ({
                    url: '/api/book',
                    method: 'POST',
                    body: bookData,
                }),
            },
        ),
    }),
});

export const {
    useGetHotelQuery,
    useSearchHotelsMutation,
    useAddHotelMutation,
    useBookHotelMutation,
    useSuggestHotelsMutation,
} = hotelsApi;
