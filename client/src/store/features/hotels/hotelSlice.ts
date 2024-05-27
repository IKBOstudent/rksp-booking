import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { IHotel, ISearchParams } from './types';

interface IHotelState {
    searchParams: ISearchParams | null;
    offers: IHotel[];
}

const initialState: IHotelState = {
    searchParams: null,
    offers: [],
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        setSearchParams(state, action: PayloadAction<ISearchParams>) {
            state.searchParams = action.payload;
        },
        resetSearchParams(state) {
            state.searchParams = null;
        },
        setOffers(state, action: PayloadAction<IHotel[]>) {
            state.offers = action.payload;
        },
    },
});

export const { setSearchParams, resetSearchParams, setOffers } =
    hotelSlice.actions;
export default hotelSlice.reducer;

export const searchParamsSelector = (state: RootState) =>
    state.hotels.searchParams;

export const offersSelector = (state: RootState) => state.hotels.offers;
