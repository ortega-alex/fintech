import { View, Text, Button } from 'react-native';
import React from 'react';
import { PrivateRoutes } from '@/models';
import { mainStyle } from '@/Style';

export default function Requests({ navigation }) {
    return (
        <View style={mainStyle.screen}>
            <Text>Requests</Text>
            <Button title={PrivateRoutes.NEW_REQUESTS} onPress={() => navigation.push(PrivateRoutes.NEW_REQUESTS)} />
            <Button title={PrivateRoutes.STATE_REQUESTS} onPress={() => navigation.push(PrivateRoutes.STATE_REQUESTS)} />
        </View>
    );
}
