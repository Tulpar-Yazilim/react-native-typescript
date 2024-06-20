import 'intl';
import 'intl/locale-data/jsonp/tr';

import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {NativeSyntheticEvent, TextInput, TextInputFocusEventData} from 'react-native';

import {useTranslation} from 'react-i18next';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {useTheme} from '@/hooks';
import {COLORS, generalStyles, SIZES} from '@/theme';

import {AppInputProps} from './app-input';
import {useCreditCardInput, useCurrencyInput} from './hooks';
import styles, {useContainerStyle} from './styles';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

const offsetHeight = SIZES.inputHeight / 3.3;

const AppInput: FC<AppInputProps> = props => {
  const {
    returnKeyType,
    placeholder,
    value,
    error,
    animatedPlaceholder,
    icon,
    editable = true,
    reference,
    type,
    form,
    name,
    label,
    skipNext,
    onChangeText,
    onSubmitEditing,
    onFocus,
    onPress,
    onClear,
    onBlur,
    ...rest
  } = props;

  const {t} = useTranslation();
  const containerStyle = useContainerStyle(error);

  const offset = useSharedValue(offsetHeight);
  const scale = useSharedValue(1);

  const [text, setText] = useState('');
  const {colors} = useTheme();

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [currencyValue, setCurrencyValue] = useCurrencyInput(value);
  const [cardValue, setCardValue] = useCreditCardInput(value, onChangeText);

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

  const onIconPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

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
      onAnimation?.({_offset: 5, _scale: 0.75});
    } else {
      onAnimation?.({_offset: offsetHeight, _scale: 1});
    }
  }, [editable, onAnimation, value]);

  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(e);
    if (!text) {
      onAnimation?.({_offset: offsetHeight, _scale: 1});
    }
  };

  const onChange = (textValue: string) => {
    let txt = textValue;

    if (type === 'currency') {
      setCurrencyValue?.(textValue);
      txt = textValue.split(',').join('');
      txt = txt.substring(0, txt.length - 2);
    }

    if (type === 'card') {
      setCardValue?.(textValue);
      txt = textValue.split('').join('');
    }

    setText(txt);
    onChangeText?.(txt);
  };

  const goToNextInput = () => {
    const values = Object.keys(form ? form?.getValues() : {});
    const currentIndex = values.indexOf(name ?? '');
    const nextInput = values?.[currentIndex + 1];

    if (text) {
      onAnimation?.({_offset: 5, _scale: 0.75});
    }
    nextInput && form && form.setFocus(nextInput);
  };

  const getValue = () => {
    switch (type) {
      case 'currency':
        return currencyValue;
      case 'card':
        return cardValue;
      default:
        return value;
    }
  };

  return (
    <React.Fragment>
      <Text>{label}</Text>
      <Block {...props}>
        <Block style={containerStyle}>
          <Block row center {...rest}>
            <Block
              style={[
                {
                  height: SIZES.inputHeight,
                },
                generalStyles.relative,
                generalStyles.flex,
              ]}>
              {onPress && <Block pressable onPress={onPress} style={generalStyles.absoluteFill} />}
              <Block>
                {animatedPlaceholder && (
                  <Animated.View style={[generalStyles.absolute, animatedStyles]}>
                    <Animated.View style={[animatedStylesText, generalStyles.flex]}>
                      <Animated.Text
                        style={[
                          styles.animatedPlaceholderStyle,
                          {
                            backgroundColor: colors.inputBg,
                          },
                        ]}>
                        {t(animatedPlaceholder)}
                      </Animated.Text>
                    </Animated.View>
                  </Animated.View>
                )}

                <TextInput
                  {...props}
                  ref={reference}
                  onFocus={e => {
                    onFocus ? onFocus(e) : onAnimation({_offset: 5, _scale: 0.75});
                  }}
                  onBlur={handleOnBlur}
                  onChangeText={onChange}
                  placeholder={placeholder ? t(placeholder) : undefined}
                  editable={editable}
                  placeholderTextColor={colors.gray}
                  style={[
                    styles.input,
                    {
                      bottom: animatedPlaceholder ? -(SIZES.inputHeight / 8) : 0,
                      height: SIZES.inputHeight,
                      color: error ? colors.error : colors.inputText,
                    },
                  ]}
                  allowFontScaling={false}
                  value={getValue()}
                  secureTextEntry={props.secureTextEntry && !isVisiblePassword}
                  returnKeyType={returnKeyType}
                  onSubmitEditing={onSubmit => {
                    skipNext && goToNextInput();
                    onSubmitEditing?.(onSubmit);
                  }}
                />
              </Block>
            </Block>
            {icon && (
              <Block center middle>
                <AppIcon name={icon} size={props.iconSize ?? 22} color={props.iconColor ?? COLORS.gray} />
              </Block>
            )}
            {type === 'password' && (
              <Block center middle pressable onPress={onIconPress}>
                <AppIcon name={isVisiblePassword ? 'eye' : 'eyeOff'} size={props.iconSize ?? 22} color={props.iconColor ?? COLORS.gray} />
              </Block>
            )}
            {value && (
              <Block
                pressable
                onPress={() => {
                  onClear?.();
                  onChange('');
                  onAnimation({_offset: offsetHeight, _scale: 1});
                }}
                center
                middle
                p-10>
                <AppIcon name="close" size={props.iconSize ?? 22} color={props.iconColor ?? COLORS.gray} />
              </Block>
            )}
          </Block>
        </Block>
        {error && (
          <Block pt-5 px-5>
            <Text error>* {error}</Text>
          </Block>
        )}
      </Block>
    </React.Fragment>
  );
};

export default memo(AppInput);
