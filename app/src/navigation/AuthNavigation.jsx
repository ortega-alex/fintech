import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PublicRoutes } from '@/models';
import { CreateAccount, RecoverPassword, SingIn } from '@/screens';
import { colors } from '@/Style';

export const AuthStack = createNativeStackNavigator();
export const AuthNavigation = () => (
    <AuthStack.Navigator initialRouteName={PublicRoutes.SING_IN}>
        <AuthStack.Screen name={PublicRoutes.SING_IN} options={{ headerShown: false }} component={SingIn} />
        <AuthStack.Screen
            name={PublicRoutes.CREATE_ACCOUNT}
            options={{
                title: null,
                headerTransparent: true,
                // headerStyle: { backgroundColor: colors.primary, elevation: 0, shadowOpacity: 0 },
                headerTintColor: colors.white
            }}
            component={CreateAccount}
        />
        <AuthStack.Screen
            name={PublicRoutes.RECOVER_PASSWORD}
            options={{
                title: null,
                headerTransparent: true,
                headerTintColor: colors.white
            }}
            component={RecoverPassword}
        />
    </AuthStack.Navigator>
);

export default AuthNavigation;
