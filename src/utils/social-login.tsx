import {LoginManager, Settings, Profile} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import {setStorage, getStorage} from './secure-storage';

const facebookLogin = async () => {
  try {
    const isFacebookLoginInit = await getStorage('facebook-login-init');
    if (!isFacebookLoginInit) {
      Settings.initializeSDK();
      await setStorage('facebook-login-init', true);
    }
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (!result.isCancelled) {
      return await Profile.getCurrentProfile();
    }
    return null;
  } catch (error) {
    console.info('facebook login error', error);
  }
};

const googleLogin = async () => {
  try {
    const isGoogleLoginInit = await getStorage('google-login-init');
    if (!isGoogleLoginInit) {
      GoogleSignin.configure();
      await setStorage('google-login-init', true);
    }
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  } catch (error) {
    console.info('google login error', error);
  }
};

const appleLogin = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      return appleAuthRequestResponse;
    }
    return null;
  } catch (error) {
    console.info('apple login error', error);
  }
};

export {facebookLogin, googleLogin, appleLogin};
