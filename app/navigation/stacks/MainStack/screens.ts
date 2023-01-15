import {SplashScreen} from '../../../screens/SplashScreen/SplashScreen';
import {BottomTabNavigation} from '../../bottom-tab/BottomTabNavigation';
import {DrawerMenuNavigaiton} from '../../drawer/DrawerMenuNavigation';

const Screens = [
  {
    name: 'Splash',
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'DrawerTabNavigation',
    component: DrawerMenuNavigaiton,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'BottomTabNavigation',
    component: BottomTabNavigation,
    options: {
      headerShown: false,
    },
  },
];

export default Screens;
