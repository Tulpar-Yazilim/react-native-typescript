import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Block, COLORS, Text} from '@theme';
import {AppIcon} from '@components';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const AppNavigationBar = ({
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
        <Block left>
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
        <Block center>
          <Text bold white center size={19}>
            TULPAR YAZILIM
          </Text>
        </Block>
        <Block alignItems="flex-end">{rightComponent}</Block>
      </Block>
      {/* <Block noflex backgroundColor={COLORS.primary} height={35}>
        <Block>
          {goBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Block paddingLeft={10} position="absolute">
                <AppIcon
                  type="ionicon"
                  name="arrow-back"
                  size={30}
                  color={COLORS.white}
                />
              </Block>
            </TouchableOpacity>
          )}

          <Block>
            <Text bold white center size={20}>
              TULPAR YAZILIM
            </Text>
          </Block>
        </Block>
      </Block> */}
    </SafeAreaView>
  );
};

AppNavigationBar.propTypes = {
  barStyle: PropTypes.string,
  goBack: PropTypes.bool,
  rightComponent: PropTypes.node,
};

AppNavigationBar.defaultProps = {
  barStyle: 'dark-content',
  goBack: false,
  rightComponent: <></>,
};

export default AppNavigationBar;
