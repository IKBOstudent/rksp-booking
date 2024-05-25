import {
    ThunkDispatch,
    UnknownAction,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import data from './data';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
    data,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
