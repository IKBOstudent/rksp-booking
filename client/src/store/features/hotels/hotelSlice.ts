import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/store/store';
import { IHotel } from './types';

interface IHotelState {
    hotel: IHotel | null;
}

const initialState: IHotelState = {
    hotel: null,
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        setHotel(state, action: PayloadAction<IHotel>) {
            state.hotel = action.payload;
        },
    },
});

export const { setHotel } = hotelSlice.actions;
export default hotelSlice.reducer;

export const hotelSelector = (state: RootState) => state.hotel.hotel;
