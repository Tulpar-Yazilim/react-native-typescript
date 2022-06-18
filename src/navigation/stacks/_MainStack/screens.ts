import {SplashScreen} from '../../../screens/SplashScreen/SplashScreen';
import {BottomTabNavigation} from '../../bottom-tab/BottomTabNavigation';
import {DrawerMenuNavigaiton} from '../../drawer/DrawerMenuNavigation';
//import AnimationDrawerNavigation from '../../drawer/AnimationDrawerNavigation';

const Screens = [
  {
    name: 'Splash',
    component: SplashScreen,
    headerShown: false,
  },
  {
    name: 'DrawerTabNavigation',
    component: DrawerMenuNavigaiton,
    headerShown: false,
  },
  {
    name: 'BottomTabNavigation',
    component: BottomTabNavigation,
    headerShown: false,
  },
];

export default Screens;
