import EncryptedStorage from 'react-native-encrypted-storage';

const setStorage = async (storageName: string, storageData: any) => {
  try {
    await EncryptedStorage.setItem(storageName, JSON.stringify(storageData));
    return true;
  } catch (error) {
    return false;
  }
};

const getStorage = async (storageName: string) => {
  try {
    const storageData = await EncryptedStorage.getItem(storageName);
    if (storageData) {
      return JSON.parse(storageData);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const removeStorage = async (storageName: string) => {
  try {
    await EncryptedStorage.removeItem(storageName);
    return true;
  } catch (error) {
    return false;
  }
};

const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

const getAppLanguage = async (): Promise<string> => {
  return getStorage('Mobile_App_Selected_Language');
};

const setAppLanguage = async (language: string) => {
  return setStorage('Mobile_App_Selected_Language', language);
};

const getUser = async () => {
  return getStorage('Mobile_App_User');
};

const setUser = async (user: any) => {
  return setStorage('Mobile_App_User', user);
};

const clearUser = async () => {
  return removeStorage('Mobile_App_User');
};

export {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  getAppLanguage,
  setAppLanguage,
  getUser,
  setUser,
  clearUser,
};
