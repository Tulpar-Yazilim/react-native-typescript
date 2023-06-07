import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import useDebounce from './useDebounce';
import useDialog from './useDialog';
import useStyledTag from './useStyledTag';
import useTag from './useTag';
import useTheme from './useTheme';
import useThemeMode from './useThemeMode';
import useTranslate from './useTranslate';

import type {AppDispatch, RootState} from '@/store';
export * from './useImage';
export {useAppDispatch, useAppSelector, useThemeMode, useDebounce, useTranslate, useTag, useTheme, useStyledTag, useDialog};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
