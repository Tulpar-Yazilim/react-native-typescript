import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';

import {Host} from 'react-native-portalize';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

//import {initializeOnesignal} from '@utils';
import {linking, locale, toastConfig} from '@config';
import {useAppSelector} from '@hooks';
import {persistor, settingsRedux, store} from '@store';

import AppLoader from './components/Common/AppLoader';
import MainStack from './navigation/stacks/MainStack';

const MainContainer = () => {
  const dispatch = useDispatch();
  const phoneTheme = useColorScheme() as any;
  const language = useAppSelector(state => state.settings.language);
  const theme = useAppSelector(state => state.settings.theme);

  useEffect(() => {
    locale(language);
  }, [language]);

  useEffect(() => {
    if (phoneTheme) {
      dispatch(
        settingsRedux.setTheme(phoneTheme === 'light' ? 'dark' : 'light'),
      );
    }
  }, [phoneTheme]);

  //useEffect(() => {
  //  initializeOnesignal();
  //}, []);

  return (
    <Host>
      <NavigationContainer
        linking={linking}
        theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle="dark-content" />
        <MainStack />
      </NavigationContainer>
      <AppLoader />
    </Host>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MainContainer />
      </PersistGate>

      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
