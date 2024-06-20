import { LogBox } from "react-native";

 const ignoreWarns = [
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
    "Remote debugger",
    "[Reanimated]",
    "Support for defaultProps"
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) { 
      if (arg[0]?.startsWith?.(warning) || arg[0]?.includes?.(warning)) {
        return;
      }
    }
    warn(...arg);
  };
  LogBox.ignoreLogs(ignoreWarns);