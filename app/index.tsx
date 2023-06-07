import React, {useEffect} from 'react';
import {Keyboard} from 'react-native';
import 'react-native-gesture-handler';

import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {AppLoader} from '@/components';
import {linking, locale, toastConfig} from '@/config';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {rootNavigationRef, RootStack} from '@/navigation';
import {persistor, settingsRedux, store} from '@/store';

const MainContainer = () => {
  const dispatch = useAppDispatch();

  const language = useAppSelector(state => state.settings.language);
  const theme = useAppSelector(state => state.settings.theme);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => dispatch(settingsRedux.changeBottomTabDisplay(false)));
    Keyboard.addListener('keyboardDidHide', () => dispatch(settingsRedux.changeBottomTabDisplay(true)));
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    locale(language);
  }, [language]);

  return (
    <Host>
      <NavigationContainer ref={rootNavigationRef} linking={linking} theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack />
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
