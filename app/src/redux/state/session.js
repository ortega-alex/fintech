import { createSlice } from '@reduxjs/toolkit';

const { _KEYS, saveStorage, clearStorage } = require('@/services');

const EmptySession = null;
export const sessionSlice = createSlice({
    name: 'session',
    initialState: EmptySession,
    reducers: {
        setSession: async (state, action) => {
            const { session, token } = action.payload;
            if (token) await saveStorage(_KEYS.TOKEN, token);
            await saveStorage(_KEYS.SESSION, session);
            return session;
        },
        modifySession: (state, action) => ({ ...state, ...action.payload }),
        resetSession: async () => {
            await clearStorage(_KEYS.SESSION);
            await clearStorage(_KEYS.TOKEN);
            return EmptySession;
        }
    }
});

export const { setSession, modifySession, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
