import useApi from './useApi';
import useDebounce from './useDebounce';
import useTranslate from './useTranslate';
import useTag from './useTag';
import useTheme from './useTheme';
import useStyledTag from './useStyledTag';

import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState, AppDispatch} from '@store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  useAppDispatch,
  useAppSelector,
  useApi,
  useDebounce,
  useTranslate,
  useTag,
  useTheme,
  useStyledTag,
};
