import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { IHotel, ISearchParams, ISuggestion } from './types';

interface IHotelSearchState {
    searchParams: ISearchParams | null;
    offers: IHotel[];
    suggests: ISuggestion[];
}

const initialState: IHotelSearchState = {
    searchParams: null,
    offers: [],
    suggests: [],
};

const hotelSearchSlice = createSlice({
    name: 'hotelSearch',
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
        setSuggestions(state, action: PayloadAction<ISuggestion[]>) {
            state.suggests = action.payload;
        },
    },
});

export const { setSearchParams, resetSearchParams, setOffers, setSuggestions } =
    hotelSearchSlice.actions;
export default hotelSearchSlice.reducer;

export const searchParamsSelector = (state: RootState) =>
    state.hotelSearch.searchParams;
export const offersSelector = (state: RootState) => state.hotelSearch.offers;
export const suggestsSelector = (state: RootState) =>
    state.hotelSearch.suggests;
