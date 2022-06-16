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
import AppSvgIcon from '../AppSvgIcon';
import Shadow from '../Shadow';
import {Props} from './app-input';

const inputHeight = 58;
const offsetHeight = inputHeight / 3.9;

const AppInput: FC<Props | any> = props => {
  const {placeholder,onChange,value,errorMessage,handleBlur,animatedPlaceholder,icon,onFocus} = props; // prettier-ignore
  const offset = useSharedValue(offsetHeight);
  const scale = useSharedValue(1);
  const [text, setText] = useState('');

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
    <>
      <Shadow sm>
        <Block style={styles.container} fd="row">
          {icon && (
            <Block justify="center" align="center">
              <AppSvgIcon name={icon} width="35" height="35" />
            </Block>
          )}
          <Block
            flex={1}
            style={[
              //styles.container,
              errorMessage && styles.errorContainer,
              {
                height: inputHeight,
              },
            ]}>
            <Animated.View style={[{position: 'absolute'}, animatedStyles]}>
              <Animated.View
                style={[
                  animatedStylesText,
                  {
                    flex: 1,
                  },
                ]}>
                <Animated.Text style={style.animatedPlaceholderStyle}>
                  {animatedPlaceholder}
                </Animated.Text>
              </Animated.View>
            </Animated.View>

            <TextInput
              onFocus={() => {
                onFocus ? onFocus() : onAnimation({_offset: 5, _scale: 0.75});
              }}
              onBlur={onBlur}
              onChangeText={onChangeText}
              placeholder={placeholder}
              style={[
                styles.input,
                errorMessage && styles.errorInput,
                {
                  bottom: animatedPlaceholder ? -3.6 : 2,
                },
              ]}
              allowFontScaling={false}
              value={value}
            />
          </Block>
        </Block>
      </Shadow>
      {errorMessage && (
        <Block px={10}>
          <Text error italic size={12}>
            {errorMessage}
          </Text>
        </Block>
      )}
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
