import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from '@navigation/stack';
import {Provider, useSelector} from 'react-redux';
import {store} from '@store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
