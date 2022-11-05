import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

import { colors, mainStyle } from '@/Style';

export default function RecoverPassword({ navigation }) {
    const [email, setEmail] = useState('');
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <View style={styles.header}>
                <Text style={mainStyle.subTitle}>Escribe tu correo y te ayudaremos a cambiar la contraseña.</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={mainStyle.label}>Correo:</Text>
                <View style={styles.flexRow}>
                    <Feather name='mail' color={colors.black} size={20} />
                    <TextInput
                        placeholder='Ingrese una correo'
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={val => setEmail(val)}
                        maxLength={45}
                        autoCompleteType='off'
                        keyboardType='email-address'
                    />
                    {String(email).trim() !== '' ? (
                        <Animatable.View animation='bounceIn'>
                            <Feather name='check-circle' color={colors.success} size={20} />
                        </Animatable.View>
                    ) : null}
                </View>
                <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: colors.primary }} onPress={() => {}}>
                    <Text style={{ color: colors.white }}>Recuperar la contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...mainStyle.button, borderColor: colors.primary, borderWidth: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ color: colors.primary }}>Inicia Sesión</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    footer: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    flexRow: {
        flexDirection: 'row',
        borderBottomColor: colors.balckLinght,
        borderBottomWidth: 1,
        marginBottom: 16,
        alignItems: 'center'
    },
    input: {
        flex: 1
    }
});
