import {LinkingOptions} from '@react-navigation/native';

const config = {
  screens: {},
};
const linking: LinkingOptions<ReactNavigation.RootParamList> | undefined = {
  prefixes: ['reactNativeTypescript://app', 'https://reactnativetypescript.com'],
  config,
};

export default linking;
