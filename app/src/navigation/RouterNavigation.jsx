import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { PrivateRoutes, PublicRoutes } from '@/models';
import { AuthNavigation, DrawerNavigation } from '@/navigation';

export const RouterStack = createNativeStackNavigator();
export const RouterNavigation = () => {
    const sessionState = useSelector(store => store.session);
    return (
        <RouterStack.Navigator screenOptions={{ headerShown: false }}>
            {sessionState ? (
                <RouterStack.Screen name={PrivateRoutes.PRIVATE} component={DrawerNavigation} />
            ) : (
                <RouterStack.Screen name={PublicRoutes.AUTH_STACK} component={AuthNavigation} />
            )}
        </RouterStack.Navigator>
    );
};

export default RouterNavigation;
