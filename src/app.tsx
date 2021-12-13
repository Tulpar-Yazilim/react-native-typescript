import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from '@navigation';
import {Provider} from 'react-redux';
import {store} from '@store';
import {initializeOnesignal} from '@utils';
import codePush from 'react-native-code-push';
import moment from 'moment';
import 'moment/locale/tr';

const App = () => {
  useEffect(() => {
    moment.locale('tr');
    initializeOnesignal();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </Provider>
  );
};

export default codePush(App);
