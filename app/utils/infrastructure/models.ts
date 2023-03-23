import {ToastType} from './enums';

export class ToastParams {
  type: ToastType = ToastType.success;
  title = '';
  message = '';
  duration?: number = 5000;
}

export class Coordinates {
  title?: string = '';
  description?: string = '';
  latitude = 0.0;
  longitude = 0.0;
}
