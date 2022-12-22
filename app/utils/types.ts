export type ImageResizeResultType = {
  name: string;
  type: string;
  uri: string;
};
export type ImagePickerResultType = {
  image: ImageResizeResultType | null;
  status: boolean;
};
