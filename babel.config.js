module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@screens': './src/screens',
          '@config': './src/config',
          '@theme': './src/theme',
          '@components': './src/components',
          '@api': './src/api',
          '@hooks': './src/hooks',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@actions': './src/store/actions',
          '@utils': './src/utils',
          '@lang': './src/lang',
          '@models': './src/models',
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
