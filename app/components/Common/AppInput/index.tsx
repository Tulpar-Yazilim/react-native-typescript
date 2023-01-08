/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, memo} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Block from '../Block';
import styles from './style';
import Text from '../Text';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FONTS} from '@theme';
import Shadow from '../Shadow';
import {Props} from './app-input';
import AppIcon from '../AppIcon';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from '@hooks';

const inputHeight = 50;
const offsetHeight = inputHeight / 3.9;

const AppInput: FC<Props | any> = props => {
  const {placeholder,onChange,value,error,onPress,onClear,handleBlur,animatedPlaceholder,icon,onFocus,editable=true,...rest} = props; // prettier-ignore
  const offset = useSharedValue(offsetHeight);
  const scale = useSharedValue(1);
  const [text, setText] = useState('');
  const {colors} = useTheme();
  const theme = useTheme();

  useEffect(() => {
    if (value) {
      onAnimation({_offset: 5, _scale: 0.75});
    }
  }, [editable, value]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    };
  });

  const animatedStylesText = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const onAnimation = ({_offset, _scale}: any) => {
    const timing_config = {
      duration: 500,
      easing: Easing.out(Easing.exp),
    };
    offset.value = withTiming(_offset, timing_config);
    scale.value = withTiming(_scale, timing_config);
  };

  const onBlur = (e: Event) => {
    handleBlur && handleBlur(e);
    if (!text) {
      onAnimation({_offset: offsetHeight, _scale: 1});
    }
  };

  const onChangeText = (t: string) => {
    setText(t);
    onChange(t);
  };

  return (
    <Block {...props}>
      <Shadow
        sm
        style={[
          styles.container,
          {
            backgroundColor: colors.inputBg,
            borderWidth: error ? 0.5 : 0,
            borderColor: theme.colors.error,
          },
        ]}
      >
        <Block fd="row" {...rest}>
          {icon && (
            <Block justify="center" align="center">
              <AppIcon name={icon} size={35} />
            </Block>
          )}

          <Block
            flex={1}
            style={[
              {
                height: inputHeight,
              },
            ]}
          >
            <Animated.View style={[{position: 'absolute'}, animatedStyles]}>
              <Animated.View
                style={[
                  animatedStylesText,
                  {
                    flex: 1,
                  },
                ]}
              >
                <Animated.Text
                  style={[
                    style.animatedPlaceholderStyle,
                    {
                      backgroundColor: colors.inputBg,
                    },
                  ]}
                >
                  {animatedPlaceholder}
                </Animated.Text>
              </Animated.View>
            </Animated.View>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                onPress && onPress();
              }}
            >
              <TextInput
                onFocus={() => {
                  onFocus ? onFocus() : onAnimation({_offset: 5, _scale: 0.75});
                }}
                onBlur={onBlur}
                onChangeText={onChangeText}
                placeholder={placeholder}
                editable={editable}
                placeholderTextColor={colors.inputText}
                style={[
                  styles.input,
                  {
                    bottom: animatedPlaceholder ? -(inputHeight / 12) : 0,
                    height: inputHeight,
                    color: error ? theme.colors.error : colors.inputText,
                  },
                ]}
                allowFontScaling={false}
                value={value}
                secureTextEntry={props.secureTextEntry}
              />
            </TouchableOpacity>
          </Block>

          <Block
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {onClear && value && (
              <Block
                pressable
                onPress={() => {
                  onClear();
                  onAnimation({_offset: offsetHeight, _scale: 1});
                }}
                center
                middle
                p-7
              >
                <Text bold default>
                  X
                </Text>
              </Block>
            )}
          </Block>
        </Block>
      </Shadow>
      {error && (
        <Block px={10}>
          <Text error md>
            * {error}
          </Text>
        </Block>
      )}
    </Block>
  );
};

export default memo(AppInput);

const style = StyleSheet.create({
  animatedPlaceholderStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 100,
    fontFamily: FONTS.medium,
    color: '#ACACAC',
  },
});
