import {FetchDataPage} from '@/screens';
import HomeStack from '../stacks/HomeStack';
import {ICONS} from '../../utils/icon-enums';

export const BottomTabItemList = [
    {
        label: 'Home Page',
        icon: ICONS.home,
        name: 'HomeScreen',
        component: HomeStack,
        headerShown: false,
    },
    {
        label: 'Fetch Page',
        icon: ICONS.home,
        name: 'FetchDataPage',
        component: FetchDataPage,
        headerShown: true,
    },
];
