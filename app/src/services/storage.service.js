import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @param {uuid String} key
 * @param {*} value
 */
export const saveStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

/**
 *
 * @param {uuid String} key
 * @returns {*}
 */
export const getStorage = async key => {
    const storage = await AsyncStorage.getItem(key);
    return storage ? JSON.parse(storage) : null;
};

/**
 *
 * @param {uuid String} key
 */
export const clearStorage = async key => {
    await AsyncStorage.removeItem(key);
};
