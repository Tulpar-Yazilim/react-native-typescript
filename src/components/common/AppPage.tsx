import React from 'react';
import {ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {AppNavigationBar} from '@components';
import {COLORS} from '@theme';
const AppPage = ({
  scroll = false,
  goBack = false,
  keyboardScroll = false,
  children = <></>,
}) => {
  return (
    <>
      <AppNavigationBar goBack={goBack} barStyle={COLORS.statusbar_dark} />
      {scroll && <ScrollView>{children}</ScrollView>}
      {keyboardScroll && (
        <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>
      )}
      {scroll === false && keyboardScroll === false && <>{children}</>}
    </>
  );
};

AppPage.protoTypes = {
  children: PropTypes.node,
  scroll: PropTypes.bool,
  keyboardScroll: PropTypes.bool,
  goBack: PropTypes.func,
};

AppPage.defaultProps = {
  children: <></>,
  scroll: false,
  keyboardScroll: false,
  goBack: false,
};

export default AppPage;
