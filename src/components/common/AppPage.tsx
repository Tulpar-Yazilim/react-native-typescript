import React, {memo} from 'react';
import {ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import AppNavigationBar from './AppNavigationBar';
import LoadingScreen from './LoadingScreen';
import {Block, COLORS} from '@theme';

const AppPage = ({
  title = '',
  scroll = false,
  goBack = false,
  backgroundColor = COLORS.white,
  barStyle = COLORS.statusbar_dark,
  barColor = COLORS.primary,
  keyboardScroll = false,
  keyboardScrollEnabled = true,
  children = <></>,
  leftComponent = <></>,
  rightComponent = <></>,
  navBar = true,
  safeArea = true,
  isLoading = false,
}) => {
  return (
    <>
      <AppNavigationBar
        title={title}
        goBack={goBack}
        barStyle={barStyle}
        barColor={barColor}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        navBar={navBar}
        safeArea={safeArea}
      />

      <>
        {scroll && (
          <Block flex backgroundColor={backgroundColor}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{flex: 1}}>
              {children}
            </ScrollView>
          </Block>
        )}
        {keyboardScroll && (
          <Block flex backgroundColor={backgroundColor}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flex: 1,
              }}
              scrollEnabled={keyboardScrollEnabled}>
              {children}
            </KeyboardAwareScrollView>
          </Block>
        )}
        {scroll === false && keyboardScroll === false && (
          <>
            <Block flex backgroundColor={backgroundColor}>
              {children}
            </Block>
          </>
        )}
      </>

      {isLoading && <LoadingScreen />}
    </>
  );
};

AppPage.protoTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  scroll: PropTypes.bool,
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.string,
  barColor: PropTypes.string,
  keyboardScroll: PropTypes.bool,
  keyboardScrollEnabled: PropTypes.bool,
  keyboardAvoid: PropTypes.bool,
  goBack: PropTypes.func,
  leftComponent: PropTypes.node,
  rightComponent: PropTypes.node,
  navBar: PropTypes.bool,
  safeArea: PropTypes.bool,
  isLoading: PropTypes.bool,
};

AppPage.defaultProps = {
  title: '',
  children: <></>,
  scroll: false,
  backgroundColor: COLORS.white,
  barStyle: COLORS.statusbar_dark,
  barColor: COLORS.primary,
  keyboardScroll: false,
  keyboardScrollEnabled: true,
  keyboardAvoid: true,
  goBack: false,
  leftComponent: <></>,
  rightComponent: <></>,
  navBar: true,
  safeArea: true,
  isLoading: false,
};

export default memo(AppPage);
