import {Images} from '@/assets';
import {useAppSelector} from '@/hooks';

export function useImage(img: Array<string>) {
  const imagesAssets: any = Images;

  const theme = useAppSelector(state => state.settings.theme);
  if (theme === 'dark') {
    let obj: any = {};
    img?.map((image: string) => {
      obj[image] =
        typeof imagesAssets?.[image].dark === 'number'
          ? imagesAssets?.[image].dark
          : imagesAssets?.[image];
    });
    return obj;
  } else if (theme === 'light') {
    let obj: any = {};
    img?.map((image: string) => {
      obj[image] =
        typeof imagesAssets?.[image].light === 'number'
          ? imagesAssets?.[image].light
          : imagesAssets?.[image];
    });
    return obj;
  }
}
