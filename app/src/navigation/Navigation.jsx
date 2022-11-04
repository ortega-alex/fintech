import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { CreateAccount, SingIn } from '@/screens';

const AuthStack = createNativeStackNavigator();
const AuthScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name='SingIn' component={SingIn} options={{ headerShown: false }} />
        <AuthStack.Screen name='CreateAccount' component={CreateAccount} />
    </AuthStack.Navigator>
);

export default function Navigation() {
    return (
        <NavigationContainer>
            <AuthScreen />
        </NavigationContainer>
    );
}
