import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = async key => {
    const storage = await AsyncStorage.getItem(key);
    return storage ? JSON.parse(storage) : null;
};

export const clearStorage = async key => {
    await AsyncStorage.removeItem(key);
};
