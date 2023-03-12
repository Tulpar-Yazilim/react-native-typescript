/* eslint-disable react-native/no-inline-styles */

export const createNavigationOptions = (props: any) => {
    const {screen} = props;
    const options = {
        // headerRight: () => <HeaderRight {...props} />,
        headerStyle: {},
        headerTitle: screen.title,
        // headerBackTitleVisible: false,
        headerTruncatedBackTitle: '',
        headerBackImageStyle: {},
        headerBackTitleStyle: {
            fontSize: 15,
        },
        headerRightContainerStyle: {},
        headerLeftContainerStyle: {},
        headerTitleStyle: {
            fontSize: 15,
        },
    };

    return screen.headerShown ? options : {headerShown: false};
};
