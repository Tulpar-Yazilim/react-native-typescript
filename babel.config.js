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
          '@api': './src/api',
          '@hook': './src/hook',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@actions': './src/store/actions',
          '@utils': './src/utils',
          '@lang': './src/lang',
        },
      },
    ],
  ],
};
