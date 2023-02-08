import React, {useEffect} from 'react';
import {Keyboard, StatusBar} from 'react-native';
import 'react-native-gesture-handler';

import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {linking, locale, toastConfig} from '@/config';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {persistor, settingsRedux, store} from '@/store';

import {navigationRef} from './navigation/RootNavigation';

import {AppLoader} from '@/components';
import MainStack from './navigation/stacks/MainStack';

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
    }, []);

    useEffect(() => {
        locale(language);
    }, [language]);

    return (
        <Host>
            <NavigationContainer ref={navigationRef} linking={linking} theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
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
