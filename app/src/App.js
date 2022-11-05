import { View } from 'react-native';
import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Spinner from 'react-native-spinkit';
import { colors, mainStyle } from './Style';
import Navigation from './navigation/Navigation';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
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
