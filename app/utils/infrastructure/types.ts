/* eslint-disable @typescript-eslint/ban-types */
import React, {FunctionComponent, ReactElement} from 'react';

import {ToastPosition} from 'react-native-toast-message';

import {SchemaInputType} from '@/components/Common/Form/types';

import {LocalNotificationType, ToastType} from './enums';

export type ScreenType = {
  title?: string;
  name?: never;
  icon?: string;
  label?: string;
  component?: ReactElement | FunctionComponent | React.FC;
  headerShown?: boolean;
  props?: never;
};

export type ToastParams = {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
};

export type Coordinates = {
  title?: string;
  description?: string;
  latitude: number;
  longitude: number;
};

export type FormitDescription = {
  meta?: FormitMeta;
};

export type FormitMeta = {
  col?: number;
  label?: string;
  type?: keyof typeof SchemaInputType;
};

export type ImageType = {
  width: number;
  height: number;
  path: string;
  type: string;
  filename: string;
};

export type ImageResizeResultType = {
  name: string;
  type: string;
  uri: string;
};
export type ImagePickerResultType = {
  image: ImageResizeResultType | null;
  status: boolean;
};

export type LocalNotificationParams = {
  id?: string;
  type?: LocalNotificationType;
  title: string;
  message: string;
  scheduleDate?: Date;
};

export type UseThemeType = {
  s?: string;
};

export type Nullable<T> = T | null;
export type Undefined<T> = T | null | undefined;
export type IndexedString<T> = Record<string, T>;
export type IndexedNumber<T> = Record<number, T>;
export type Keyof<T extends {}> = Extract<keyof T, string>;
export type KeyofList<Values> = {
  [K in keyof Values]?: Values[K] extends object[]
    ? Values[K][number] extends object
      ? KeyofList<Values[K][number]>[] | string | string[]
      : string | string[]
    : Values[K] extends object
    ? KeyofList<Values[K]>
    : string;
};
export type NavigationScreenListenerEvent = {
  data: {
    state: {
      index: number;
      key: string;
      routeNames: [];
      routes: [{key: string; name: string; params: []}];
      stale: string;
      type: string;
    };
    type: string;
  };
};
