import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import {
    ChangePassword,
    CreateAccount,
    DetailLoan,
    NewRequests,
    Profile,
    RecoverPassword,
    Requests,
    SingIn,
    Splash,
    StateRequests,
    WeLend
} from '@/screens';
import { PrivateRoutes, PublicRoutes } from '@/models';
import { getStorage, _KEYS } from '@/services';
import { setSession } from '@/redux';
import { colors } from '@/Style';

const AuthStack = createNativeStackNavigator();
const AuthScreen = () => (
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

const ProfileStack = createNativeStackNavigator();
const ProfileScreen = () => (
    <ProfileStack.Navigator initialRouteName={PrivateRoutes.PROFILE}>
        <ProfileStack.Screen name={PrivateRoutes.PROFILE} component={Profile} />
        <ProfileStack.Screen name={PrivateRoutes.CHANGE_PASSWORD} component={ChangePassword} />
    </ProfileStack.Navigator>
);

const RequestsStack = createNativeStackNavigator();
const RequestsScreen = () => (
    <RequestsStack.Navigator initialRouteName={PrivateRoutes.REQUESTS}>
        <RequestsStack.Screen name={PrivateRoutes.REQUESTS} component={Requests} />
        <RequestsStack.Screen name={PrivateRoutes.NEW_REQUESTS} component={NewRequests} />
        <RequestsStack.Screen name={PrivateRoutes.STATE_REQUESTS} component={StateRequests} />
    </RequestsStack.Navigator>
);

const WeLendStack = createNativeStackNavigator();
const WeLendScreen = () => (
    <WeLendStack.Navigator initialRouteName={PrivateRoutes.WE_LEND}>
        <WeLendStack.Screen name={PrivateRoutes.WE_LEND} component={WeLend} />
        <WeLendStack.Screen name={PrivateRoutes.DETAIL_LOAN} component={DetailLoan} />
    </WeLendStack.Navigator>
);

const Tab = createBottomTabNavigator();
const TabScreen = () => (
    <Tab.Navigator
        initialRouteName={PrivateRoutes.REQUESTS_STACK}
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === PrivateRoutes.REQUESTS_STACK) {
                    iconName = focused ? 'add' : 'add-outline';
                } else if (route.name === PrivateRoutes.WE_LEND_STACK) {
                    iconName = focused ? 'document-text' : 'document-text-outline';
                } else if (route.name === PrivateRoutes.PROFILE_STACK) {
                    iconName = focused ? 'person' : 'person-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray'
        })}
    >
        <Tab.Screen name={PrivateRoutes.REQUESTS_STACK} component={RequestsScreen} />
        <Tab.Screen name={PrivateRoutes.WE_LEND_STACK} component={WeLendScreen} />
        <Tab.Screen name={PrivateRoutes.PROFILE_STACK} component={ProfileScreen} />
    </Tab.Navigator>
);

const RouterStack = createNativeStackNavigator();
const RouterScreen = () => {
    const sessionState = useSelector(store => store.session);
    return (
        <RouterStack.Navigator screenOptions={{ headerShown: false }}>
            {sessionState ? (
                <RouterStack.Screen name={PrivateRoutes.PRIVATE} component={TabScreen} />
            ) : (
                <RouterStack.Screen name={PublicRoutes.AUTH_STACK} component={AuthScreen} />
            )}
        </RouterStack.Navigator>
    );
};

export default function Navigation() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const handleValidSession = async () => {
        const store = await getStorage(_KEYS.SESSION);
        if (store) dispatch(setSession(store));
    };

    useEffect(() => {
        handleValidSession();
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    if (loading) return <Splash />;

    return (
        <NavigationContainer>
            <RouterScreen />
        </NavigationContainer>
    );
}
