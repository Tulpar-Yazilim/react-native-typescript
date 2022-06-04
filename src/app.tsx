import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {linking, locale, toast} from '@config';
import {RootStack} from '@navigation';
import {Provider} from 'react-redux';
import {store} from '@store';
import {initializeOnesignal} from '@utils';
import codePush from 'react-native-code-push';
import Toast from 'react-native-toast-message';

const MainContent = () => {
  return (
    <>
      <RootStack linking={linking} />
      <Toast config={toast} />
    </>
  );
};

const App = () => {
  useEffect(() => {
    locale();
    initializeOnesignal();
  }, []);
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
};

export default codePush(App);
