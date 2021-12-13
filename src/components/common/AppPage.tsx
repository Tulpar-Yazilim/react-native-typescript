import React from 'react';
import {ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import AppNavigationBar from './AppNavigationBar';
import {COLORS} from '@theme';

const AppPage = ({
  title = '',
  scroll = false,
  goBack = false,
  keyboardScroll = false,
  children = <></>,
  rightComponent = <></>,
}) => {
  return (
    <>
      <AppNavigationBar
        title={title}
        goBack={goBack}
        barStyle={COLORS.statusbar_dark}
        rightComponent={rightComponent}
      />
      {scroll && <ScrollView>{children}</ScrollView>}
      {keyboardScroll && (
        <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
      )}
      {scroll === false && keyboardScroll === false && <>{children}</>}
    </>
  );
};

AppPage.protoTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  scroll: PropTypes.bool,
  keyboardScroll: PropTypes.bool,
  goBack: PropTypes.func,
  rightComponent: PropTypes.func,
};

AppPage.defaultProps = {
  title: '',
  children: <></>,
  scroll: false,
  keyboardScroll: false,
  goBack: false,
  rightComponent: <></>,
};

export default AppPage;
