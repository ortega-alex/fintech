import { View } from 'react-native';
import React, { Suspense, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Spinner from 'react-native-spinkit';
import { Provider } from 'react-redux';

import { colors, mainStyle } from './Style';
import store from './redux/store';
import { PublicProvateInterceptor } from './interceptors';
import { Navigation } from './navigation';

export default function App() {
    useEffect(() => {
        PublicProvateInterceptor();
    }, []);

    return (
        <SafeAreaProvider style={mainStyle.container}>
            <Suspense
                fallback={
                    <View style={mainStyle.screen}>
                        <Spinner isVisible type='Pulse' color={colors.primary} />
                    </View>
                }
            >
                <Provider store={store}>
                    <Navigation />
                </Provider>
            </Suspense>
        </SafeAreaProvider>
    );
}
