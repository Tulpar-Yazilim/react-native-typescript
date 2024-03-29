import Config from 'react-native-config';
import crypto from 'react-native-crypto-js';

const decrypt = (data: never) => {
  try {
    const decryptedData = crypto.AES.decrypt(data, crypto.enc.Utf8.parse(Config.CRYPTO_KEY), {
      iv: crypto.enc.Utf8.parse(Config.CRYPTO_KEY),
    }).toString(crypto.enc.Utf8);
    const decryptedDataParsed = JSON.parse(crypto.enc.Base64.parse(decryptedData).toString(crypto.enc.Utf8));
    return decryptedDataParsed;
  } catch (error) {
    console.error(error);
    return data;
  }
};

export {decrypt};
