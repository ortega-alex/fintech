import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice, deviceSlice } from './state';

export default configureStore({
    reducer: {
        session: sessionSlice.reducer,
        device: deviceSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        })
});
