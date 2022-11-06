import { createSlice } from '@reduxjs/toolkit';

const EmptySession = null;
export const sessionSlice = createSlice({
    name: 'session',
    initialState: EmptySession,
    reducers: {
        setSession: (state, action) => action.payload,
        modifySession: (state, action) => ({ ...state, ...action.payload }),
        resetSession: async () => EmptySession
    }
});

export const { setSession, modifySession, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
