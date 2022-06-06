import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import {Text} from '../Text/Text';
import {COLORS, fingerSize} from '@theme';
import {getStyleShortcuts} from '../../../utils/StyleShortcut';
import {ReactNode} from 'react';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  type: 'primary' | 'secondary' | 'ghost' | 'icon';
  disabled?: boolean | any;
  loading?: boolean;
  title: string;
  icon?: ReactNode;
  children?: any;
};

export const Button: FC<Props | any> = props => {
  const {onPress, disabled, type, loading, title, icon} = props;

  const buttonTypes = {
    primary: {
      container: {
        backgroundColor: COLORS.primary,
      },
      text: {
        color: COLORS.white,
      },
    },
    secondary: {
      container: {
        backgroundColor: COLORS.secondary,
      },
      text: {
        color: COLORS.white,
      },
    },
    ghost: {},
    icon: {
      container: {
        width: fingerSize,
        height: fingerSize,
        padding: 0,
      },
    },
  } as any;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.container,
        buttonTypes[type].container,
        disabled && styles.disabled,
        {...getStyleShortcuts(props)},
      ]}
      onPress={onPress}
      disabled={disabled}
      {...props}>
      {loading && (
        <View style={{flexDirection: 'row'}}>
          <ActivityIndicator color={COLORS.white} style={{paddingRight: 12}} />
          <Text style={[buttonTypes[type].text, styles.text]}>
            Please Wait ...
          </Text>
        </View>
      )}

      {!loading && (
        <Text style={[buttonTypes[type].text, styles.text]}>{title}</Text>
      )}

      {type === 'icon' && icon}
    </TouchableOpacity>
  );
};
