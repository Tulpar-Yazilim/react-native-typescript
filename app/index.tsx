import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Host} from 'react-native-portalize';

import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';

//import {initializeOnesignal} from '@utils';
import {useAppSelector} from '@hooks';
import {linking, locale, toastConfig} from '@config';
import {store, persistor} from '@store';

import MainStack from './navigation/stacks/MainStack';
import AppLoader from './components/Common/AppLoader';

const MainContainer = () => {
  const language = useAppSelector(state => state.settings.language);

  useEffect(() => {
    locale(language);
  }, [language]);

  //useEffect(() => {
  //  initializeOnesignal();
  //}, []);

  return (
    <Host>
      <NavigationContainer linking={linking}>
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
