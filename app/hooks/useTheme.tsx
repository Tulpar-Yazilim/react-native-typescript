import {useAppSelector} from '@hooks';
import {COLORS, themeColors} from '@theme';
import {getStyleShortcuts, getTextStyleShortcuts} from '@utils';
import {useColorScheme} from 'react-native';

interface ITheme {
  colors: typeof COLORS;
  styles?: any;
  textStyles?: any;
}

const useTheme = (props?: any): ITheme => {
  const phoneTheme = useColorScheme() as any;
  const theme = useAppSelector(state => state.settings.theme);
  const colors = themeColors[theme || phoneTheme];

  return {
    colors,
    styles: getStyleShortcuts({...props, ...props?.s} || {}, theme),
    textStyles: getTextStyleShortcuts({...props, ...props?.s} || {}, theme),
  };
};

export default useTheme;
