const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);