import {useColorScheme} from 'react-native';

import {useAppSelector} from '@/hooks';
import {COLORS, themeColors} from '@/theme';
import {getStyleShortcuts, getTextStyleShortcuts} from '@/utils';
import {UseThemeType} from '@/utils/infrastructure/types';

interface ITheme {
  colors: typeof COLORS;
  styles?: never;
  textStyles?: never;
}

const useTheme = (props?: UseThemeType): ITheme => {
  const phoneTheme = useColorScheme();
  const theme = useAppSelector(state => state.settings.theme);
  const colors = themeColors[theme || phoneTheme];

  return {
    colors,
    styles: getStyleShortcuts({...props} || {}, theme) as never,
    textStyles: getTextStyleShortcuts({...props} || {}, theme) as never,
  };
};

export default useTheme;
