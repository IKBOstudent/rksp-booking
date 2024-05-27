import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './features/auth/authApi';
import auth from './features/auth/authSlice';
import hotels from './features/hotels/hotelSlice';
import { hotelsApi } from './features/hotels/hotelApi';

export const store = configureStore({
    reducer: {
        auth,
        hotels,
        [authApi.reducerPath]: authApi.reducer,
        [hotelsApi.reducerPath]: hotelsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
