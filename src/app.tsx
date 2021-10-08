import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from '@navigation/stack';
import {Provider} from 'react-redux';
import {store} from '@store';
import codePush from 'react-native-code-push';
import moment from 'moment';
import 'moment/locale/tr';

const App = () => {
  useEffect(() => {
    moment.locale('tr');
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default codePush(App);
