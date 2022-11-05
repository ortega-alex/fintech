import { View, Text, StyleSheet, Image, StatusBar, TextInput, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { colors, mainStyle } from '@/Style';
import { PublicRoutes } from '@/models';
import logo from '@/assests/images/logo.png';

export default function SingIn({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const handleOnchange = (name, value) => setUser({ ...user, [name]: value });

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <View style={styles.header}>
                <Image source={logo} resizeMode='center' />
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Text style={mainStyle.label}>Correo/Usuario:</Text>
                <View style={styles.flexRow}>
                    <FontAwesome name='envelope-o' color={colors.black} size={20} />
                    <TextInput
                        placeholder='Ingrese un correo/usuario'
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={val => handleOnchange('username', val)}
                        maxLength={45}
                        autoCompleteType='off'
                    />
                    {String(user.username).trim() !== '' ? (
                        <Animatable.View animation='bounceIn'>
                            <Feather name='check-circle' color={colors.success} size={20} />
                        </Animatable.View>
                    ) : null}
                </View>
                <Text style={mainStyle.label}>Contraseña:</Text>
                <View style={styles.flexRow}>
                    <Feather name='lock' color={colors.black} size={20} />
                    <TextInput
                        placeholder='Ingrese su contraseña'
                        secureTextEntry={!showPass}
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={val => handleOnchange('password', val)}
                        maxLength={45}
                    />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        <Feather name={showPass ? 'eye-off' : 'eye'} color={colors.black} size={20} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: colors.primary }} onPress={() => {}}>
                    <Text style={{ color: colors.white }}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <View style={mainStyle.divide}>
                    <View style={styles.line} />
                    <Text style={styles.label}>Or</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: '#1976D2' }} onPress={() => {}}>
                    <Text style={{ color: colors.white }}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: colors.white }} onPress={() => {}}>
                    <Text>Google</Text>
                </TouchableOpacity>
                {Platform.OS === 'ios' && (
                    <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: colors.primary }} onPress={() => {}}>
                        <Text style={{ color: colors.white }}>Apple</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={{ ...mainStyle.button, borderColor: colors.primary, borderWidth: 1 }}
                    onPress={() => navigation.push(PublicRoutes.CREATE_ACCOUNT)}
                >
                    <Text style={{ color: colors.primary }}>Regístrate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={mainStyle.button} onPress={() => navigation.push(PublicRoutes.RECOVER_PASSWORD)}>
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }}>¿Olvidaste tu contraseña?</Text>
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
        flex: Platform.OS === 'android' ? 4 : 6,
        backgroundColor: colors.whiteLinght,
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
