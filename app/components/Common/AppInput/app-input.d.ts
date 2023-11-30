import {LegacyRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {UseFormReturn} from 'react-hook-form';

import {ICONS} from '@/utils';

export type AppInputProps = {
  placeholder?: string;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: keyof typeof ICONS;
  iconColor?: ColorValue | string;
  iconSize?: number;
  label?: string;
  form?: UseFormReturn;
  name?: string;
  error?: string;
  reference?: LegacyRef<TextInput>;
  inputProps?: object;
  disabled?: boolean;
  type?: 'password' | 'text' | 'currency' | 'card';
  skipNext?: boolean;
  onChangeText?: (_text: string) => void;
  onPress?: () => void;
  onClear?: () => void;
} & TextInputProps;
