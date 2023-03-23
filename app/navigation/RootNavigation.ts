import {createNavigationContainerRef, StackActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: never, params?: never) {
  if (navigationRef?.isReady()) {
    navigationRef?.navigate(name, params || ({} as never));
  }
}

export function replace(name: never, params?: never) {
  if (navigationRef?.isReady()) {
    navigationRef?.dispatch(StackActions.replace(name, params || ({} as never)));
  }
}
