import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PrivateRoutes } from '@/models';
import { NewRequests, Requests, StateRequests } from '@/screens';
import { colors, mainStyle } from '@/Style';

export const RequestsStack = createNativeStackNavigator();
export const RequestsNavigation = () => (
    <RequestsStack.Navigator
        initialRouteName={PrivateRoutes.REQUESTS}
        screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: colors.white,
            headerStyle: mainStyle.header,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}
    >
        <RequestsStack.Screen
            name={PrivateRoutes.REQUESTS}
            component={Requests}
            options={({ navigation }) => ({
                title: 'Solicitudes',
                headerLeft: () => (
                    <Ionicons.Button name='ios-menu' size={25} backgroundColor={colors.primary} onPress={() => navigation.openDrawer()} />
                ),
                headerRight: () => (
                    <Ionicons.Button
                        name='add-outline'
                        size={25}
                        backgroundColor={colors.primary}
                        onPress={() => navigation.push(PrivateRoutes.NEW_REQUESTS)}
                    />
                )
            })}
        />
        <RequestsStack.Screen name={PrivateRoutes.NEW_REQUESTS} component={NewRequests} options={{ title: 'Nueva Solicitud' }} />
        <RequestsStack.Screen name={PrivateRoutes.STATE_REQUESTS} component={StateRequests} options={{ title: 'Estado de la Solicitud' }} />
    </RequestsStack.Navigator>
);

export default RequestsNavigation;
