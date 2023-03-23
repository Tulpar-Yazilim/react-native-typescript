import {Images} from '@/assets';
import {useAppSelector} from '@/hooks';
import {IThemeImageObject} from '@/utils';

export function useImage(img: Array<string>) {
  const theme = useAppSelector(state => state.settings.theme);
  if (theme === 'dark') {
    const obj: IThemeImageObject = {};
    img?.map((image: string) => {
      const imgCheck = Object.getOwnPropertyDescriptor(Images, image);
      obj[image] = typeof imgCheck?.value?.dark === 'number' ? imgCheck?.value?.dark : imgCheck?.value;
    });
    return obj;
  } else if (theme === 'light') {
    const obj: IThemeImageObject = {};
    img?.map((image: string) => {
      const imgCheck = Object.getOwnPropertyDescriptor(Images, image);
      obj[image] = typeof imgCheck?.value?.light === 'number' ? imgCheck?.value?.light : imgCheck?.value;
    });
    return obj;
  }
}
