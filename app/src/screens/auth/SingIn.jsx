import { View, Text, StyleSheet, Image, StatusBar, TextInput, Platform, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setSession } from '@/redux';

import { colors, mainStyle } from '@/Style';
import { PrivateRoutes, PublicRoutes } from '@/models';
import logo from '@/assests/images/logo.png';
import { sessionAdapter } from '@/adapters';
import { httpSingIn, saveStorage, _KEYS } from '@/services';

export const SingIn = ({ navigation }) => {
    const deviceState = useSelector(store => store.device);
    const dispacth = useDispatch();

    const [showPass, setShowPass] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleOnchange = (name, value) => setUser({ ...user, [name]: value });
    const handleSubmit = async () => {
        try {
            if (!deviceState.connected) {
                Alert.alert('Sin conexión', 'No se puede conectar con el servidor, verifique su conexión a internet.');
                return true;
            }
            setLoading(true);
            const res = await httpSingIn(user);
            if (res.message) Alert.alert('Error al iniciar sesión', res.message);
            else {
                const session = sessionAdapter(res.session);
                dispacth(setSession(session));
                await saveStorage(_KEYS.SESSION, session);
                await saveStorage(_KEYS.TOKEN, res.token);
                navigation.navigate(PrivateRoutes.PRIVATE);
            }
        } catch (error) {
            Alert.alert('Error del servidor', error.toString());
        }
    };

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
                <TouchableOpacity
                    style={{ ...mainStyle.button, backgroundColor: colors.primary }}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={{ color: colors.white }}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <View style={mainStyle.divide}>
                    <View style={styles.line} />
                    <Text style={styles.label}>Or</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: '#1976D2' }} onPress={() => {}} disabled={loading}>
                    <Text style={{ color: colors.white }}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...mainStyle.button, backgroundColor: colors.white }} onPress={() => {}} disabled={loading}>
                    <Text>Google</Text>
                </TouchableOpacity>
                {Platform.OS === 'ios' && (
                    <TouchableOpacity
                        style={{ ...mainStyle.button, backgroundColor: colors.primary }}
                        onPress={() => {}}
                        disabled={loading}
                    >
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
};

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
        borderBottomColor: colors.blackLinght,
        borderBottomWidth: 1,
        marginBottom: 16,
        alignItems: 'center'
    },
    input: {
        flex: 1
    }
});

export default SingIn;
