import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from './state';

export default configureStore({
    reducer: {
        session: sessionSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
});
