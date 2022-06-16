import Animated, {Extrapolation} from 'react-native-reanimated';
Animated.Extrapolate = Extrapolation;

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
