import { colors, mainStyle } from '@/Style';
import React from 'react';
import { Alert, PermissionsAndroid, Platform, StyleSheet, Text, TouchableHighlight, View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';

export default function Inputs({ arr, options, values, errors, onChange }) {
    async function hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) return true;
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    const handleCamare = async (name, modo) => {
        if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
            return;
        }
        if (modo === 'camara') {
            ImagePicker.openCamera({
                mediaType: 'photo',
                cropping: false,
                compressImageMaxWidth: 1024, // 1PM
                compressImageMaxHeight: 1024, // 1PM
                compressImageQuality: 0.7
            })
                .then(image => handleSaveImage(image, name))
                .catch(err => console.log(err));
        } else {
            ImagePicker.openPicker({
                mediaType: 'photo',
                cropping: false,
                multiple: false,
                compressImageMaxWidth: 1024, // 1PM
                compressImageMaxHeight: 1024, // 1PM
                compressImageQuality: 0.7
            })
                .then(image => handleSaveImage(image, name))
                .catch(err => console.log(err));
        }
    };

    const handleSaveImage = async (image, name) => {
        try {
            const filename = image.path.substring(image.path.lastIndexOf('/') + 1);
            const imagen = { uri: image.path, name: filename, type: image.mime };
            onChange(name, imagen);
        } catch (error) {
            Alert.alert('Error', 'Error al tomar la fotografia');
        }
    };

    const renderUploadFile = item => (
        <TouchableHighlight
            style={{ ...mainStyle.button, ...styles.btnCamera }}
            onPress={() => handleCamare(item.name, 'camara')}
            onLongPress={() => handleCamare(item.name, 'galery')}
        >
            <View style={styles.row}>
                <Ionicons name='md-camera' color={colors.primary} size={27} />
                <View style={styles.alignCenter}>
                    <Text style={{ ...mainStyle.label, ...styles.text }}>
                        {values[item.name] ? 'Volver a Seleccionar' : 'Seleccionar'} {item.label}
                    </Text>
                    <Text style={styles.description}>Al mantener presionado se abre la galería</Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderTextArea = item => (
        <View>
            <Text style={mainStyle.label}>{item.label}</Text>
            <View style={styles.containerInput}>
                <TextInput
                    placeholder={`Ingrese ${String(item.label).toLowerCase()}`}
                    multiline
                    numberOfLines={4}
                    onChange={val => onChange(item.name, val)}
                    value={values[item.name]}
                    style={styles.input}
                />
                {item.required && errors[item.name] ? (
                    <Animatable.View animation='bounceIn'>
                        <Feather name='alert-circle' color={colors.danger} size={20} />
                    </Animatable.View>
                ) : null}
            </View>
        </View>
    );

    const renderInputText = item => (
        <View>
            <Text style={mainStyle.label}>{item.label}</Text>
            <View style={styles.containerInput}>
                <TextInput
                    placeholder={`Ingrese ${String(item.label).toLowerCase()}`}
                    autoCapitalize='none'
                    maxLength={45}
                    onChange={val => onChange(item.name, val)}
                    value={values[item.name]}
                    style={styles.input}
                />
                {item.required && errors[item.name] ? (
                    <Animatable.View animation='bounceIn'>
                        <Feather name='alert-circle' color={colors.danger} size={20} />
                    </Animatable.View>
                ) : null}
            </View>
        </View>
    );

    return (
        <View>
            {arr.map((item, i) => (
                <View key={i} style={styles.container}>
                    {item.id === '1'
                        ? renderUploadFile(item)
                        : item.id === '2'
                        ? renderTextArea(item)
                        : item.id === '4'
                        ? renderInputText(item)
                        : null}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    btnCamera: {
        borderColor: colors.primary,
        borderWidth: 1,
        borderStyle: 'dashed',
        height: 36
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alignCenter: {
        alignItems: 'center',
        gap: 3
    },
    text: {
        color: colors.primary,
        marginLeft: 4
    },
    description: {
        fontSize: 8,
        marginLeft: 4
    },
    containerInput: {
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
