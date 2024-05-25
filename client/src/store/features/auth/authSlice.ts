

    import { createSlice, PayloadAction } from '@reduxjs/toolkit';

    interface AuthState {
      user: IUser | null
    }

    const initialState: AuthState = {
      user: null,
    };

    const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
        setUser(state, action: PayloadAction<IUser>) {
          state.user = action.payload;
        },
        logout(state) {
          state.user = null;
        },
      },
    });

    export const { setUser, logout } = authSlice.actions;
    export default authSlice.reducer;
