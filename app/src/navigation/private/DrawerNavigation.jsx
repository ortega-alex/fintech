import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, NativeModules, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { PrivateRoutes } from '@/models';
import { RequestsNavigation, WeLendNavigation, ProfileNavigation } from '@/navigation';
import { colors } from '@/Style';
import LinearGradient from 'react-native-linear-gradient';
import { resetSession } from '@/redux';
import { clearStorage, _KEYS } from '@/services';

export const DrawerMenu = props => {
    const sessionState = useSelector(store => store.session);
    const deviceState = useSelector(store => store.device);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await clearStorage(_KEYS.SESSION);
        await clearStorage(_KEYS.TOKEN);
        dispatch(resetSession());
        NativeModules.DevSettings.reload();
    };
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: colors.primary }}>
                <TouchableOpacity onPress={() => props.navigation.navigate(PrivateRoutes.PROFILE)}>
                    <LinearGradient
                        colors={[colors.primaryDark, colors.primary]}
                        style={{ padding: 20 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Image source={require('@/assests/images/user.jpg')} style={styles.avatar} />
                        <Text style={styles.title}>{sessionState.full_name}</Text>
                        <View style={styles.flexRow}>
                            <Text style={styles.subtutle}>{sessionState.username}</Text>
                            <FontAwesome5 name='coins' size={14} color={colors.whiteLinght} />
                        </View>
                    </LinearGradient>
                    <View style={styles.listItem}>
                        <DrawerItemList {...props} />
                    </View>
                </TouchableOpacity>
            </DrawerContentScrollView>
            <View style={styles.customList}>
                <View style={styles.button}>
                    <View style={styles.flexRow}>
                        <Ionicons name='information-circle-outline' size={22} />
                        <Text style={styles.textItem}>Versión: {deviceState.version}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                    <View style={styles.flexRow}>
                        <Ionicons name='exit-outline' size={22} />
                        <Text style={styles.textItem}>Cerrar Sesión</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const Drawer = createDrawerNavigator();
export const DrawerNavigation = () => (
    <Drawer.Navigator
        screenOptions={{
            headerShown: false,
            drawerLabelStyle: styles.drawerLabel,
            drawerActiveBackgroundColor: colors.primary,
            drawerActiveTintColor: colors.whiteLinght,
            drawerInactiveTintColor: colors.black
        }}
        drawerContent={props => <DrawerMenu {...props} />}
    >
        <Drawer.Screen
            name={PrivateRoutes.REQUESTS_STACK}
            component={RequestsNavigation}
            options={{
                title: 'Solicitudes',
                drawerIcon: ({ color }) => <Ionicons name='copy-outline' size={22} color={color} />
            }}
        />
        <Drawer.Screen
            name={PrivateRoutes.WE_LEND_STACK}
            component={WeLendNavigation}
            options={{
                title: 'Prestamos',
                drawerIcon: ({ color }) => <Ionicons name='checkmark-done-outline' size={22} color={color} />
            }}
        />
        <Drawer.Screen
            name={PrivateRoutes.PROFILE_STACK}
            component={ProfileNavigation}
            options={{
                title: 'Perfil',
                drawerIcon: ({ color }) => <Ionicons name='person-outline' size={22} color={color} />
            }}
        />
    </Drawer.Navigator>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerLabel: {
        marginLeft: -25,
        fontFamily: 'Roboto-Medium',
        fontSize: 15
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        color: colors.whiteLinght,
        fontFamily: 'Roboto-Medium'
    },
    subtutle: {
        color: colors.whiteLinght,
        fontFamily: 'Roboto-Regular',
        marginRight: 5
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItem: {
        flex: 1,
        backgroundColor: colors.whiteLinght,
        paddingTop: 10
    },
    customList: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: colors.whiteDark
    },
    button: {
        paddingVertical: 15
    },
    textItem: {
        fontSize: 15,
        fontFamily: 'Roboto-Medium',
        marginLeft: 5
    }
});

export default DrawerNavigation;
