export class ApiResult<T> {
  message: string;
  isSuccess: boolean;
  data: T;
  constructor(message: string, isSuccess: boolean, data: T) {
    this.message = message;
    this.isSuccess = isSuccess ? isSuccess : false;
    this.data = data;
  }
}
