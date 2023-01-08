import {ToastType} from './enums';

export class ToastParams {
  type: ToastType = ToastType.success;
  title: string = '';
  message: string = '';
  duration?: number = 5000;
}

export class Coordinates {
  title?: string = '';
  description?: string = '';
  latitude: number = 0.0;
  longitude: number = 0.0;
}
