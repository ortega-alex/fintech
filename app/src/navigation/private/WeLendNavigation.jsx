import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PrivateRoutes } from '@/models';
import { DetailLoan, WeLend } from '@/screens';
import { colors, mainStyle } from '@/Style';

export const WeLendStack = createNativeStackNavigator();
export const WeLendNavigation = () => (
    <WeLendStack.Navigator
        initialRouteName={PrivateRoutes.WE_LEND}
        screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: colors.white,
            headerStyle: mainStyle.header,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}
    >
        <WeLendStack.Screen
            name={PrivateRoutes.WE_LEND}
            component={WeLend}
            options={({ navigation }) => ({
                title: 'Prestamos',
                headerLeft: () => (
                    <Ionicons.Button name='ios-menu' size={25} backgroundColor={colors.primary} onPress={() => navigation.openDrawer()} />
                )
            })}
        />
        <WeLendStack.Screen name={PrivateRoutes.DETAIL_LOAN} component={DetailLoan} />
    </WeLendStack.Navigator>
);

export default WeLendNavigation;
