import {COLORS, FONTS, SIZES} from '@theme';

export interface IStyleShortcuts {
  w?: number;
  h?: number;
  mx?: number;
  my?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  px?: number;
  py?: number;
  p?: number;
  pl?: number;
  pb?: number;
  pt?: number;
  pr?: number;
  bg?: number;
  fs?: number;
  bw?: number;
  align?: string;
  justify?: string;
  direction?: string;
  backgoundColor?: string;
  flex?: number;
  radius?: number;
  borderRadius?: number;
  color?: string;
}

const shortcutStyles: IStyleShortcuts | any = {
  w: 'width',
  h: 'height',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  mr: 'marginRight',
  ml: 'marginLeft',
  mt: 'marginTop',
  mb: 'marginBottom',
  px: 'paddingHorizontal',
  p: 'padding',
  py: 'paddingVertical',
  pl: 'paddingLeft',
  pb: 'paddingBottom',
  pt: 'paddingTop',
  pr: 'paddingRight',
  bg: 'backgroundColor',
  fs: 'fontSize',
  bw: 'borderWidth',
  align: 'alignItems',
  justify: 'justifyContent',
  fd: 'flexDirection',
  backgoundColor: 'bg',
  flex: 'flex',
  radius: 'borderRadius',
  borderRadius: 'borderRadius',
  color: 'color',
  top: 'top',
} as any;

const predefinedStyles = {
  block: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  wrap: {flexWrap: 'wrap'},
  border: {
    borderWidth: 1,
    borderColor: 'gray',
  },
} as any;

const predefinedTextStyles = {
  xs: {
    fontSize: SIZES.extraSmall,
    letterSpacing: 0.15,
  },
  sm: {
    fontSize: SIZES.small,
    letterSpacing: 0,
  },
  md: {
    fontSize: SIZES.medium,
    letterSpacing: 0.15,
  },
  title: {
    fontSize: SIZES.title,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: SIZES.subtitle,
    fontFamily: 'Poppins-Regular',
  },
  caption: {
    fontSize: SIZES.caption,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.4,
  },
  small: {
    fontSize: SIZES.small,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1.5,
  },
  input: {
    fontFamily: 'Poppins-Regular',
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
  },
  button: {
    fontFamily: 'Poppins-Regular',
  },
  primary: {
    color: COLORS.primary,
  },
  white: {
    color: COLORS.white,
  },
  error: {
    color: COLORS.error,
  },
  bold: {
    fontFamily: FONTS.bold,
  },
  italic: {
    fontFamily: FONTS.italic,
  },
} as any;

export const getStyleShortcuts = (props: IStyleShortcuts | any) => {
  let styles = {} as any;

  Object.keys(props).forEach((prop: any) => {
    if (shortcutStyles[prop]) {
      styles[shortcutStyles[prop]] = props[prop];
    } else {
      styles = {...styles, ...predefinedStyles[prop]};
    }
  });

  return styles;
};

export const getTextStyleShortcuts = (props: any) => {
  let styles = {} as any;

  Object.keys(props).forEach((prop: any) => {
    styles = {...styles, ...predefinedTextStyles[prop]};
  });

  return styles;
};
