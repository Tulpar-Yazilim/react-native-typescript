import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface IThemeImageObject {
    [image: string]: string | number;
}

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
    s?: string;
}

export interface ITextStyles {
    fullWidth: StyleProp<TextStyle>;
    xs: StyleProp<TextStyle>;
    sm: StyleProp<TextStyle>;
    md: StyleProp<TextStyle>;
    header: StyleProp<TextStyle>;
    subheader: StyleProp<TextStyle>;
    title: StyleProp<TextStyle>;
    subtitle: StyleProp<TextStyle>;
    caption: StyleProp<TextStyle>;
    small: StyleProp<TextStyle>;
    input: StyleProp<TextStyle>;
    placeholder: StyleProp<TextStyle>;
    button: StyleProp<TextStyle>;
    default: StyleProp<TextStyle>;
    primary: StyleProp<TextStyle>;
    black: StyleProp<TextStyle>;
    secondary: StyleProp<TextStyle>;
    success: StyleProp<TextStyle>;
    white: StyleProp<TextStyle>;
    error: StyleProp<TextStyle>;
    light: StyleProp<TextStyle>;
    medium: StyleProp<TextStyle>;
    bold: StyleProp<TextStyle>;
    italic: StyleProp<TextStyle>;
}

export interface IPredefinedStyles {
    'bg-primary': StyleProp<ViewStyle>;
    'bg-card': StyleProp<ViewStyle>;
    'bg-white': StyleProp<ViewStyle>;
    px: StyleProp<ViewStyle>;
    block: StyleProp<ViewStyle>;
    flex: StyleProp<ViewStyle>;
    row: StyleProp<ViewStyle>;
    column: StyleProp<ViewStyle>;
    center: StyleProp<ViewStyle>;
    middle: StyleProp<ViewStyle>;
    'justify-between': StyleProp<ViewStyle>;
    'align-between': StyleProp<ViewStyle>;
    left: StyleProp<ViewStyle>;
    right: StyleProp<ViewStyle>;
    top: StyleProp<ViewStyle>;
    bottom: StyleProp<ViewStyle>;
    wrap: StyleProp<ViewStyle>;
    border: StyleProp<ViewStyle>;
    borderBottom: StyleProp<ViewStyle>;
}

export interface IStyles {
    shortcutStyles: IStyleShortcuts;
    predefinedStyles: IPredefinedStyles;
}
