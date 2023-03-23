import React, {FC, LegacyRef, memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

import {UseFormReturn} from 'react-hook-form';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import styles from './style';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

import {useTheme} from '@/hooks';
import {COLORS, FONTS} from '@/theme';

const inputHeight = 50;
const offsetHeight = inputHeight / 3.9;

interface AppInputProps extends TextInputProps {
  placeholder?: string;
  onChangeText?: (_text: string) => void;
  handleBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string;
  label?: string;
  form?: UseFormReturn;
  name?: string;
  error?: boolean | string;
  onPress?: () => void;
  onClear?: () => void;
  reference?: LegacyRef<TextInput>;
  inputProps?: object;
  skipNext?: boolean;
  disabled?: boolean;
}

const AppInput: FC<AppInputProps> = props => {
  const {
    returnKeyType,
    placeholder,
    onChangeText,
    value,
    error,
    onPress,
    onClear,
    handleBlur,
    animatedPlaceholder,
    icon,
    onFocus,
    editable = true,
    reference,
    form,
    name,
    label,
    skipNext = false,
    ...rest
  } = props;

  const offset = useSharedValue(offsetHeight);
  const scale = useSharedValue(1);
  const [text, setText] = useState('');
  const {colors} = useTheme();
  const theme = useTheme();

  const onAnimation = useCallback(
    ({_offset, _scale}: {_offset: number; _scale: number}) => {
      const timingConfig = {
        duration: 500,
        easing: Easing.out(Easing.exp),
      };
      offset.value = withTiming(_offset, timingConfig);
      scale.value = withTiming(_scale, timingConfig);
    },
    [offset, scale],
  );

  useEffect(() => {
    if (value) {
      onAnimation({_offset: 5, _scale: 0.75});
    }
  }, [editable, onAnimation, value]);

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

  const onBlur = (e: Event) => {
    handleBlur && handleBlur(e);
    if (!text) {
      onAnimation({_offset: offsetHeight, _scale: 1});
    }
  };

  const onChange = (t: string) => {
    setText(t);
    onChangeText?.(t);
  };

  const goToNextInput = () => {
    const values = Object.keys(form ? form?.getValues() : {});
    const currentIndex = values.indexOf(name || '');
    const nextInput = values?.[currentIndex + 1];

    if (text) {
      onAnimation({_offset: 5, _scale: 0.75});
    }
    nextInput && form && form.setFocus(nextInput);
  };

  return (
    <>
      <Text tinyGray>{label}</Text>
      <Block {...props}>
        <Block
          sm
          style={[
            styles.container,
            {
              backgroundColor: colors.inputBg,
              borderWidth: error ? 0.5 : 0,
              borderColor: theme.colors.error,
            },
          ]}>
          <Block row center {...rest}>
            <Block
              style={[
                {
                  height: inputHeight,
                  flex: 1,
                  position: 'relative',
                },
              ]}>
              {onPress && (
                <Block
                  pressable
                  onPress={() => {
                    onPress && onPress();
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: 99,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                  }}
                />
              )}
              <Block>
                <Animated.View style={[{position: 'absolute'}, animatedStyles]}>
                  <Animated.View
                    style={[
                      animatedStylesText,
                      {
                        flex: 1,
                      },
                    ]}>
                    <Animated.Text
                      style={[
                        style.animatedPlaceholderStyle,
                        {
                          backgroundColor: colors.inputBg,
                        },
                      ]}>
                      {animatedPlaceholder}
                    </Animated.Text>
                  </Animated.View>
                </Animated.View>

                <TextInput
                  {...props}
                  ref={reference}
                  onFocus={(e: Event) => {
                    onFocus ? onFocus(e) : onAnimation({_offset: 5, _scale: 0.75});
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder={placeholder}
                  editable={editable}
                  placeholderTextColor={colors.gray}
                  style={[
                    styles.input,
                    {
                      bottom: animatedPlaceholder ? -(inputHeight / 8) : 0,
                      height: inputHeight,
                      color: error ? theme.colors.error : colors.inputText,
                    },
                  ]}
                  allowFontScaling={false}
                  value={value}
                  secureTextEntry={props.secureTextEntry}
                  returnKeyType={returnKeyType}
                  onSubmitEditing={() => {
                    skipNext && goToNextInput();
                  }}
                />
              </Block>
            </Block>
            <Block
              style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {onClear && value && (
                <Block
                  pressable
                  onPress={() => {
                    onClear();
                    onAnimation({_offset: offsetHeight, _scale: 1});
                  }}
                  center
                  middle
                  p-7>
                  <Text bold>X</Text>
                </Block>
              )}
            </Block>
            {icon && (
              <Block center middle>
                <AppIcon name={icon} size={24} color={COLORS.gray} />
              </Block>
            )}
          </Block>
        </Block>
        {error && (
          <Block px={10}>
            <Text error md>
              * {error}
            </Text>
          </Block>
        )}
      </Block>
    </>
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
