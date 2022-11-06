import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { getStorage, _KEYS } from '@/services';
import { modyfyDevice, setSession } from '@/redux';
import { Splash } from '@/screens';
import { RouterNavigation } from '@/navigation';

export const Navigation = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const handleValidSession = async () => {
        const store = await getStorage(_KEYS.SESSION);
        if (store) dispatch(setSession(store));
    };

    const unsubscribe = NetInfo.addEventListener(state => dispatch(modyfyDevice({ connected: state.isConnected })));

    useEffect(() => {
        handleValidSession();
        unsubscribe();
        setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => {
            unsubscribe();
        };
    }, []);

    if (loading) return <Splash />;

    return (
        <NavigationContainer>
            <RouterNavigation />
        </NavigationContainer>
    );
};

export default Navigation;
