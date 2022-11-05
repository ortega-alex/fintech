import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { colors, mainStyle } from '@/Style';

export default function CreateAccount({ navigation }) {
    const [showPass, setShowPass] = useState({
        pass: false,
        confir: false
    });
    const [user, setUser] = useState({
        full_name: '',
        email: '',
        password: '',
        confir_password: ''
    });
    const handleOnchange = (name, value) => setUser({ ...user, [name]: value });
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <View style={styles.header}>
                <Text style={mainStyle.title}>Regístrate</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={mainStyle.label}>Nombre completo:</Text>
                <View style={styles.flexRow}>
                    <FontAwesome name='envelope-o' color={colors.black} size={20} />
                    <TextInput
                        placeholder='Ingrese un nombre completo'
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={val => handleOnchange('full_name', val)}
                        maxLength={45}
                        autoCompleteType='off'
                    />
                    {String(user.full_name).trim() !== '' ? (
                        <Animatable.View animation='bounceIn'>
                            <Feather name='check-circle' color={colors.success} size={20} />
                        </Animatable.View>
                    ) : null}
                </View>
                <Text style={mainStyle.label}>Correo:</Text>
                <View style={styles.flexRow}>
                    <Feather name='mail' color={colors.black} size={20} />
                    <TextInput
                        placeholder='Ingrese una correo'
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={val => handleOnchange('email', val)}
                        maxLength={45}
                        autoCompleteType='off'
                        keyboardType='email-address'
                    />
                    {String(user.email).trim() !== '' ? (
                        <Animatable.View animation='bounceIn'>
                            <Feather name='check-circle' color={colors.success} size={20} />
                        </Animatable.View>
                    ) : null}
                </View>
                <Text style={mainStyle.label}>Contraseña:</Text>
                <View style={styles.flexRow}>
                    <Feather name='lock' color={colors.black} size={20} />
                    <TextInput
                        placeholder='Ingrese una contraseña'
                        secureTextEntry={!showPass.pass}
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={val => handleOnchange('password', val)}
                        maxLength={45}
                    />
                    <TouchableOpacity onPress={() => setShowPass({ ...showPass, pass: !showPass.pass })}>
                        <Feather name={showPass.pass ? 'eye-off' : 'eye'} color={colors.black} size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={mainStyle.label}>Confirma la contraseña:</Text>
                <View style={styles.flexRow}>
                    <Feather name='lock' color={colors.black} size={20} />
                    <TextInput
                        placeholder='Ingrese una contraseña'
                        secureTextEntry={!showPass.confir}
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={val => handleOnchange('confir', val)}
                        maxLength={45}
                    />
                    <TouchableOpacity onPress={() => setShowPass({ ...showPass, confir: !showPass.confir })}>
                        <Feather name={showPass.pass ? 'eye-off' : 'eye'} color={colors.black} size={20} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: colors.primary }} onPress={() => {}}>
                    <Text style={{ color: colors.white }}>Regístrate</Text>
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
        alignItems: 'center'
    },
    footer: {
        flex: 4,
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
