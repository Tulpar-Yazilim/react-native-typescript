import React, {memo} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS, SIZES, Text, Button, Block} from '@theme';
import AppIcon from './AppIcon';

const AppButton = ({
  onPress = () => {},
  title = '',
  color = COLORS.primary,
  icon = null,
  style = {},
  outlined = false,
  titleProps = null,
  loading = false,
  ...rest
}) => {
  return (
    <Button
      onPress={onPress}
      color={color}
      outlined={outlined}
      style={[styles.default, style]}
      {...rest}>
      <Block center row middle>
        {icon && <AppIcon {...icon} style={{marginRight: 6}} />}
        <Text
          center
          color={outlined ? color : COLORS.white}
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

const styles = StyleSheet.create({
  default: {
    height: SIZES.buttonHeight,
    paddingHorizontal: SIZES.padding,
  },
});

export default memo(AppButton);
