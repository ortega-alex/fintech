import { Platform, StyleSheet } from 'react-native';

export const colors = {
    primary: '#278fb0',
    'primary-dark': '#006180',
    white: '#FFFFFF'
};

export const mainStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'flex-start',
        paddingBottom: Platform.OS === 'android' ? 0 : 20
    },
    screen: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.primary,
        borderWidth: 1
    }
});
