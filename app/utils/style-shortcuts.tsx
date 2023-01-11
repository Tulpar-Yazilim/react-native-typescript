import {COLORS, FONTS, SIZES, themeColors, window} from '@theme';

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

const getStyles = (t: 'light' | 'dark'): any => {
  const colors: any = themeColors[t || 'light'];
  return {
    shortcutStyles: {},
    predefinedStyles: {
      'bg-primary': {
        backgroundColor: colors.primary,
      },
      'bg-card': {
        backgroundColor: colors.cardBg,
      },
      pxw: {
        paddingHorizontal: window.offset,
      },
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
      'justify-between': {
        justifyContent: 'space-between',
      },
      'align-between': {
        alignItems: 'space-between',
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
    },
  };
};

const getTextStyles = (t: 'light' | 'dark'): any => {
  const colors: typeof COLORS = themeColors[t || 'light'];

  return {
    xs: {
      fontSize: SIZES.extraSmall,
      letterSpacing: 0.15,
    },
    'w-full': {
      width: '100%',
    },
    sm: {
      fontSize: SIZES.small,
      letterSpacing: 0,
    },
    md: {
      fontSize: SIZES.medium,
      letterSpacing: 0.15,
    },
    header: {
      fontSize: SIZES.header,
      fontFamily: 'Poppins-Bold',
      letterSpacing: 0.15,
    },
    subheader: {
      fontSize: SIZES.subheader,
      fontFamily: 'Poppins-Regular',
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
    default: {
      color: colors.defaultTextColor,
    },
    primary: {
      color: colors.primary,
    },
    black: {
      color: colors.black,
    },
    secondary: {
      color: colors.secondary,
    },
    success: {
      color: colors.successText,
    },
    white: {
      color: colors.white,
    },
    error: {
      color: colors.error,
    },
    bold: {
      fontFamily: FONTS.bold,
    },
    italic: {
      fontFamily: FONTS.italic,
    },
  };
};

const sizes: any = {};

Array.from({length: 300}).forEach((_, i: number) => {
  let value = i;

  sizes['rounded-' + i] = {borderRadius: value};
  sizes['mx-' + i] = {marginHorizontal: value};
  sizes['px-' + i] = {paddingHorizontal: value};
  sizes['py-' + i] = {paddingVertical: value};
  sizes['mr-' + i] = {marginRight: value};
  sizes['ml-' + i] = {marginLeft: value};
  sizes['mt-' + i] = {marginTop: value};
  sizes['mb-' + i] = {marginBottom: value};
  sizes['pr-' + i] = {paddingRight: value};
  sizes['pl-' + i] = {paddingLeft: value};
  sizes['pt-' + i] = {paddingTop: value};
  sizes['pb-' + i] = {paddingBottom: value};
  sizes['p-' + i] = {padding: value};
  sizes['m-' + i] = {margin: value};
  sizes['h-' + i] = {height: value};
  sizes['w-' + i] = {width: value};
  sizes['col-' + i] = {width: (100 / 12) * i + '%'};
});

export const getStyleShortcuts = (props: IStyleShortcuts | any, t?: any) => {
  let styles = {} as any;
  const {shortcutStyles, predefinedStyles} = getStyles(t || 'light');

  if (props.s) {
    props.s.split(' ').forEach((prop: any) => {
      if (shortcutStyles[prop]) {
        styles[shortcutStyles[prop]] = props[prop];
      } else {
        styles = {...styles, ...sizes?.[prop], ...predefinedStyles?.[prop]};
      }
    });
  }

  Object.keys(props).forEach((prop: any) => {
    if (shortcutStyles[prop]) {
      styles[shortcutStyles[prop]] = props[prop];
    } else {
      styles = {...styles, ...predefinedStyles?.[prop], ...sizes?.[prop]};
    }
  });

  return {...styles};
};

export const getTextStyleShortcuts = (props: any, t?: any) => {
  let styles = {} as any;

  const predefinedTextStyles = getTextStyles(t);

  Object.keys(props).forEach((prop: any) => {
    styles = {...styles, ...predefinedTextStyles[prop], ...sizes?.[prop]};
  });

  return styles;
};
