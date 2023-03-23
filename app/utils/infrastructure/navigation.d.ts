import {RootNavigationProps} from 'navigations/rootNavigation/navigationProps';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationProps {}
  }
}
