const obfuscatingTransformer = require('react-native-obfuscator');

module.exports = obfuscatingTransformer({
  obfuscatorOptions: {
    compact: true, // default true
    controlFlowFlattening: false, // default false
    controlFlowFlatteningThreshold: 0.75, // default 0.75
    deadCodeInjection: false, // default false
    deadCodeInjectionThreshold: 1, // default 0.4
    debugProtection: false, // default false
    debugProtectionInterval: false, // default false
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal', // default hexadecimal
    log: false, // default false
    renameGlobals: true, // default false
    rotateStringArray: true, // default true
    seed: 0, // default 0
    selfDefending: false, // default true: not working if true
    shuffleStringArray: true, // default true
    sourceMapMode: 'separate', // default seperate
    splitStrings: true, // default false
    splitStringsChunckLength: 10, // default 10
    stringArray: true, // default true
    stringArrayEncoding: 'rc4', // default false
    stringArrayThreshold: 0.75, // default 0.8
    target: 'browser', // default browser
    transformObjectKeys: true, // default false
    unicodeEscapeSequence: true,
  },
  upstreamTransformer: require('metro-react-native-babel-transformer'),
  emitObfuscatedFiles: false,
  enableInDevelopment: true,
  trace: true,
});
