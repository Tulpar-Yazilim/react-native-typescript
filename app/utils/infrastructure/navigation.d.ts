import {MainStackNavigationProps} from '@/navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackNavigationProps {}
  }
}
