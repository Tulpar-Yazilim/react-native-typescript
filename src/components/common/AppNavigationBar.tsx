import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Block, COLORS, Text} from '@theme';
import AppIcon from './AppIcon';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const AppNavigationBar = ({
  title = '',
  goBack = false,
  rightComponent = <></>,
  barStyle = 'dark-content',
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView backgroundColor={COLORS.primary}>
      <StatusBar
        animated
        barStyle={barStyle}
        backgroundColor={COLORS.primary}
      />
      <Block row height={35}>
        <Block noflex alignItems="flex-start" middle>
          {goBack && (
            <Block paddingLeft={10}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AppIcon
                  type="ionicon"
                  name="arrow-back"
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </Block>
          )}
        </Block>
        <Block flex={1} center middle>
          <Text bold white size={19}>
            {title}
          </Text>
        </Block>
        <Block noflex alignItems="flex-end" middle>
          {rightComponent}
        </Block>
      </Block>
    </SafeAreaView>
  );
};

AppNavigationBar.propTypes = {
  title: PropTypes.string,
  barStyle: PropTypes.string,
  goBack: PropTypes.bool,
  rightComponent: PropTypes.node,
};

AppNavigationBar.defaultProps = {
  title: '',
  barStyle: 'dark-content',
  goBack: false,
  rightComponent: <></>,
};

export default AppNavigationBar;
