module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './app/screens',
          '@config': './app/config',
          '@theme': './app/theme',
          '@components': './app/components',
          '@api': './app/api',
          '@hooks': './app/hooks',
          '@assets': './app/assets',
          '@navigation': './app/navigation',
          '@routes': './app/navigation/Routes',
          '@store': './app/store',
          '@actions': './app/store/actions',
          '@utils': './app/utils',
          '@lang': './app/lang',
          '@models': './app/models',
        },
      },
    ],
    'module:react-native-dotenv',
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
