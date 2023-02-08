import {LoginPage, SplashScreen} from '@/screens';
import Routes from '../../Routes';
import {BottomTabNavigation} from '../../bottom-tab/BottomTabNavigation';
import {DrawerMenuNavigaiton} from '../../drawer/DrawerMenuNavigation';

const Screens = [
    {
        name: Routes.SPLASH_SCREEN,
        component: SplashScreen,
        options: {
            headerShown: false,
        },
    },
    {
        name: Routes.LOGIN_SCREEN,
        component: LoginPage,
        options: {
            headerShown: false,
        },
    },
    {
        name: Routes.MAIN_DRAWER_ROOT,
        component: DrawerMenuNavigaiton,
        options: {
            headerShown: false,
        },
    },
    {
        name: Routes.MAIN_TABS_ROOT,
        component: BottomTabNavigation,
        options: {
            headerShown: false,
        },
    },
];

export default Screens;
