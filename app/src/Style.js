import { Platform, StyleSheet } from 'react-native';

export const colors = {
    primary: '#278fb0',
    primaryDark: '#006180',
    white: '#f8f9fa',
    whiteLinght: '#ffffff',
    black: '#212121',
    blackDark: '#000',
    balckLinght: '#484848',
    success: '#28a745'
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
        alignItems: 'center'
    },
    divide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 16
    },
    line: {
        flex: 1,
        height: 3,
        backgroundColor: colors.balckLinght
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.whiteLinght
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'justify'
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.whiteLinght
    },
    label: {
        fontSize: 12,
        fontWeight: '600'
    },
    button: {
        height: 32,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: colors.blackDark,
        shadowOpacity: 0.8,
        shadowRadius: 4,
        width: '100%',
        marginBottom: 16
    }
});
