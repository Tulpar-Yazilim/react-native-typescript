import React, {memo} from 'react';
import {Pressable, SafeAreaView, StatusBar} from 'react-native';
import {Block, COLORS, Text} from '@theme';
import AppIcon from './AppIcon';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const CustomStatusBar = ({
  barStyle = COLORS.statusbar_dark,
  barColor = COLORS.primary,
  safeArea = true,
}) => (
  <>
    {safeArea ? (
      <SafeAreaView backgroundColor={barColor}>
        <StatusBar barStyle={barStyle} backgroundColor={barColor} />
      </SafeAreaView>
    ) : (
      <StatusBar barStyle={barStyle} backgroundColor={barColor} />
    )}
  </>
);

const Content = ({
  title = '',
  goBack = false,
  leftComponent = <></>,
  rightComponent = <></>,
  barColor = COLORS.primary,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <Block backgroundColor={barColor} row height={60}>
        <Block noflex width="15%" paddingLeft={15} middle>
          {leftComponent && (
            <Block noflex middle center>
              {leftComponent}
            </Block>
          )}
          {goBack && navigation.canGoBack() && (
            <Block noflex middle center>
              <Pressable
                style={{width: 26, height: 26}}
                onPress={() => navigation.goBack()}>
                <AppIcon
                  type="ionicon"
                  name="arrow-back"
                  size={26}
                  color={COLORS.white}
                />
              </Pressable>
            </Block>
          )}
        </Block>
        <Block width="70%" center middle>
          <Text semibold white size={20}>
            {title}
          </Text>
        </Block>
        <Block noflex width="15%" paddingRight={15} middle>
          {rightComponent && (
            <Block noflex middle center>
              {rightComponent}
            </Block>
          )}
        </Block>
      </Block>
    </>
  );
};

const AppNavigationBar = ({
  title = '',
  goBack = false,
  navBar = true,
  safeArea = true,
  leftComponent = <></>,
  rightComponent = <></>,
  barStyle = COLORS.statusbar_dark,
  barColor = COLORS.primary,
}) => {
  return (
    <>
      <CustomStatusBar
        barStyle={barStyle}
        barColor={barColor}
        safeArea={safeArea}
      />
      {navBar && (
        <Content
          title={title}
          goBack={goBack}
          leftComponent={leftComponent}
          rightComponent={rightComponent}
          barColor={barColor}
        />
      )}
    </>
  );
};

AppNavigationBar.propTypes = {
  title: PropTypes.string,
  barStyle: PropTypes.string,
  barColor: PropTypes.string,
  goBack: PropTypes.bool,
  leftComponent: PropTypes.node,
  rightComponent: PropTypes.node,
};

AppNavigationBar.defaultProps = {
  title: '',
  barStyle: COLORS.statusbar_dark,
  barColor: COLORS.primary,
  goBack: false,
  leftComponent: <></>,
  rightComponent: <></>,
};

export default memo(AppNavigationBar);
