import AsyncStorage from '@react-native-async-storage/async-storage';

let tokenStorage = 'token';

const setToken = async (token: string) => {
    await AsyncStorage.setItem(tokenStorage, JSON.stringify(token));
};

const getToken = async () => {
    const token: any = await AsyncStorage.getItem(tokenStorage);
    return JSON.parse(token);
};

const setUser = async (user: any) => {
    try {
        console.log('storage', user)
        await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        console.log('error', error)
    };
};

const getUser = async () => {
    const user: any = await AsyncStorage.getItem('user');
    return JSON.parse(user);
};

const removeUser = async () => {
    await AsyncStorage.removeItem('user');
};

const removeToken = async () => {
    await AsyncStorage.removeItem(tokenStorage);
};

export { setToken, getToken, setUser, getUser, removeToken, removeUser };