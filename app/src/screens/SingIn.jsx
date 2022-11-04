import { View, Text, Button } from 'react-native';
import React from 'react';
import { mainStyle } from '@/Style';

export default function SingIn({ navigation }) {
    return (
        <View style={mainStyle.screen}>
            <Text>SingIn</Text>
            <Button onPress={() => navigation.push('CreateAccount')} title='Create account' />
        </View>
    );
}
