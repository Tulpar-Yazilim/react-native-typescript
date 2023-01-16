import type {AppDispatch, RootState} from '@store';
import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import useApi from './useApi';
import useDebounce from './useDebounce';
import useDialog from './useDialog';
import useStyledTag from './useStyledTag';
import useTag from './useTag';
import useTheme from './useTheme';
import useTranslate from './useTranslate';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  useAppDispatch,
  useAppSelector,
  useDebounce,
  useTranslate,
  useTag,
  useTheme,
  useStyledTag,
  useDialog,
};
