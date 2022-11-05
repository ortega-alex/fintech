import { View, StatusBar } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { colors, mainStyle } from '@/Style';

export default function Splash() {
    return (
        <View style={{ ...mainStyle.screen, backgroundColor: colors.primary }}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Animatable.Image
                animation='pulse'
                easing='ease-out'
                iterationCount='infinite'
                resizeMode='center'
                source={require('../assests/images/logo.png')}
            />
        </View>
    );
}
