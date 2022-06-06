/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {linking, locale} from '@config';
import {Provider} from 'react-redux';
import {initializeOnesignal} from '@utils';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import MainStack from './navigation/stacks/_MainStack';
import Text from './theme/Text';
import store, {persistor} from './store/Store';

const toastConfig = {
  success: ({text1, ...props}: any) => (
    <View style={{padding: 10, width: '100%', height: 60}}>
      <View
        style={{
          height: 60,
          width: '100%',
          backgroundColor: 'green',
          borderRadius: 10,
        }}>
        <Text>{text1}</Text>
        <Text>{props?.uuid}</Text>
      </View>
    </View>
  ),
  error: ({text1, ...props}: any) => (
    <View style={{padding: 10, width: '100%', height: 60}}>
      <View
        style={{
          height: 60,
          width: '100%',
          backgroundColor: 'red',
          borderRadius: 10,
        }}>
        <Text>{text1}</Text>
        <Text>{props?.uuid}</Text>
      </View>
    </View>
  ),
};

const App = () => {
  useEffect(() => {
    locale();
    initializeOnesignal();
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Text>Loading</Text>}>
          <NavigationContainer linking={linking}>
            <StatusBar barStyle="dark-content" />
            <MainStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
