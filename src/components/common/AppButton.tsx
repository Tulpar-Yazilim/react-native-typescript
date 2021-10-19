import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS, SIZES, Text, Button, Block} from '@theme';
import AppIcon from './AppIcon';

const AppButton = ({
  onPress = () => {},

  title = '',
  icon = null,
  style = null,
  outlined = false,
  titleProps = null,
  loading = false,
  ...rest
}) => {
  return (
    <Button
      onPress={onPress}
      color={COLORS.primary}
      outlined={outlined}
      style={[styles.default, style]}
      {...rest}>
      <Block center row middle>
        {icon && <AppIcon {...icon} style={{marginRight: 6}} />}
        <Text
          center
          color={outlined ? COLORS.primary : COLORS.white}
          blackFont
          {...titleProps}>
          {title}
        </Text>
        {loading && (
          <ActivityIndicator style={{marginLeft: 10}} color={COLORS.white} />
        )}
      </Block>
    </Button>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  default: {
    height: SIZES.buttonHeight,
  },
});
