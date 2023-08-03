import 'intl';
import 'intl/locale-data/jsonp/tr';

import React, {FC, LegacyRef, memo, useCallback, useEffect, useState} from 'react';
import {NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, ViewStyle} from 'react-native';

import {UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import Animated, {AnimatedStyleProp, Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {useTheme} from '@/hooks';
import {COLORS, FONTS} from '@/theme';
import {ICONS} from '@/utils';

import styles from './style';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

const inputHeight = 50;
const offsetHeight = inputHeight / 3.3;

interface AppInputProps extends TextInputProps {
  placeholder?: string;
  onChangeText?: (_text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: keyof typeof ICONS;
  label?: string;
  form?: UseFormReturn;
  name?: string;
  error?: string;
  onPress?: () => void;
  onClear?: () => void;
  reference?: LegacyRef<TextInput>;
  inputProps?: object;
  skipNext?: boolean;
  disabled?: boolean;
  type?: 'password' | 'text' | 'currency' | 'card';
}

const {format: formatCurrency} = Intl.NumberFormat('tr-TR', {
  currency: 'TRY',
  style: 'currency',
});

const useCurrencyInput = (initialValue: string | undefined) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    handleChange(initialValue + '00');
  }, []);

  const handleChange = (v: string) => {
    const decimal = Number(v.replace(/\D/g, '')) / 100;
    setValue(
      formatCurrency(decimal || 0)
        .split('₺')[1]
        .replace('R$\xa0', ''),
    );
  };
  return [value, handleChange] as [string, (v: string) => void];
};

const useCreditCardInput = (initialValue = '', onChangeText?: (_cardValue: string) => void) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (v: string) => {
    const cardValue = v.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    if (cardValue) {
      const test = !cardValue[2] ? cardValue[1] : `${cardValue[1]} ${cardValue[2]}${`${cardValue[3] ? ` ${cardValue[3]}` : ''}`}${`${cardValue[4] ? ` ${cardValue[4]}` : ''}`}`;
      setValue(test.toString());
      onChangeText?.(test.toString());
    }
  };
  return [value, handleChange] as [string, (v: string) => void];
};

const AppInput: FC<AppInputProps> = props => {
  const {
    returnKeyType,
    placeholder,
    onChangeText,
    value,
    error,
    onPress,
    onClear,
    onBlur,
    animatedPlaceholder,
    icon,
    onFocus,
    editable = true,
    reference,
    type,
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

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [currencyValue, setCurrencyValue] = useCurrencyInput(value);
  const [cardValue, setCardValue] = useCreditCardInput(value, onChangeText);

  const {t} = useTranslation();

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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
    } as AnimatedStyleProp<ViewStyle>;
  });

  const animatedStylesText = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    } as AnimatedStyleProp<TextStyle>;
  });

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
    } else if (type === 'card') {
      setCardValue?.(textValue);
      txt = textValue.split('').join('');
    } else {
      setText(txt);
      onChangeText?.(txt);
    }
  };

  const goToNextInput = () => {
    const values = Object.keys(form ? form?.getValues() : {});
    const currentIndex = values.indexOf(name || '');
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
        <Block
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
                  onPress={onPress}
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
                {animatedPlaceholder && (
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
                      bottom: animatedPlaceholder ? -(inputHeight / 8) : 0,
                      height: inputHeight,
                      color: error ? theme.colors.error : colors.inputText,
                    },
                  ]}
                  allowFontScaling={false}
                  value={getValue()}
                  secureTextEntry={props.secureTextEntry && !isVisiblePassword}
                  returnKeyType={returnKeyType}
                  onSubmitEditing={() => {
                    skipNext && goToNextInput();
                  }}
                />
              </Block>
            </Block>
            {icon && (
              <Block center middle>
                <AppIcon name={icon} size={24} color={COLORS.gray} />
              </Block>
            )}
            {type === 'password' && (
              <Block center middle pressable onPress={onIconPress}>
                <AppIcon name={isVisiblePassword ? 'eye' : 'eyeOff'} size={24} color={COLORS.gray} />
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
                <AppIcon name={'close'} size={16} color={COLORS.gray} />
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

const style = StyleSheet.create({
  animatedPlaceholderStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    fontSize: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 100,
    fontFamily: FONTS.medium,
    color: '#ACACAC',
  },
});
