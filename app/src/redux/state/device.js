import { createSlice } from '@reduxjs/toolkit';
import DeviceInfo from 'react-native-device-info';

const deviceEmpty = {
    connected: false,
    batery: 0,
    version: DeviceInfo.getVersion(),
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    speed: 0,
    version_operativo: DeviceInfo.getSystemName() + ' ' + DeviceInfo.getSystemVersion()
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState: deviceEmpty,
    reducers: {
        setDevice: (state, action) => action.payload,
        modyfyDevice: (state, action) => ({ ...state, ...action.payload }),
        cleanDevice: () => deviceEmpty
    }
});

export const { setDevice, modyfyDevice, cleanDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
