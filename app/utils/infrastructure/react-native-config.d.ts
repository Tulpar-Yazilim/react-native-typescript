declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string;
    MENU: 'tab' | 'drawer';
    USE_CRYPTO: boolean;
    CRYPTO_KEY: string;
    ONESIGNAL_APP_ID: string;
    TWITTER_COMSUMER_KEY: string;
    TWITTER_CONSUMER_SECRET: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
