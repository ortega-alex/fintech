import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PrivateRoutes } from '@/models';
import { ChangePassword, Profile } from '@/screens';

export const ProfileStack = createNativeStackNavigator();
export const ProfileNavigation = () => (
    <ProfileStack.Navigator initialRouteName={PrivateRoutes.PROFILE}>
        <ProfileStack.Screen name={PrivateRoutes.PROFILE} component={Profile} />
        <ProfileStack.Screen name={PrivateRoutes.CHANGE_PASSWORD} component={ChangePassword} />
    </ProfileStack.Navigator>
);

export default ProfileNavigation;
