import {StyleProp, ViewProps} from 'react-native';

import {IStyles, ITextStyles} from './infrastructure/interfaces';
import {UseThemeType} from './infrastructure/types';
import rgba from './rgba';
import {setupSizes} from './style/size';

import {COLORS, FONTS, SIZES, themeColors, window} from '@/theme';

const getStyles = (t: 'light' | 'dark') => {
    const colors = themeColors[t || 'light'];
    const styles: IStyles = {
        shortcutStyles: {},
        predefinedStyles: {
            'bg-primary': {
                backgroundColor: colors.backgroundPrimary,
            },
            'bg-card': {
                backgroundColor: colors.cardBg,
            },
            'bg-white': {
                backgroundColor: colors.white,
            },
            px: {
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
                alignItems: 'stretch',
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
            borderBottom: {
                borderBottomWidth: 0.3,
                borderBottomColor: rgba(colors.defaultTextColor, 0.35),
            },
        },
    };
    return styles;
};

const getTextStyles = (t: 'light' | 'dark') => {
    const colors: typeof COLORS = themeColors[t || 'light'];
    const styles: ITextStyles = {
        fullWidth: {
            width: '100%',
        },
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
        light: {
            fontFamily: FONTS.light,
        },
        medium: {
            fontFamily: FONTS.medium,
        },
        bold: {
            fontFamily: FONTS.bold,
        },
        italic: {
            fontFamily: FONTS.italic,
        },
    };
    return styles;
};

const sizes = Object.freeze({...setupSizes});

export const getStyleShortcuts = (props: UseThemeType, t?: 'light' | 'dark') => {
    let styles = {} as IStyles | StyleProp<ViewProps>;
    const {shortcutStyles, predefinedStyles} = getStyles(t || 'light');

    if (props.s) {
        props.s.split(' ').forEach(prop => {
            const customProp = prop as never;
            const customShortcut = shortcutStyles[customProp];
            if (customShortcut) {
                if (styles) styles[customShortcut] = props[customProp];
            } else {
                const customPredefinedStyles = predefinedStyles?.[customProp] as object;
                styles = {...(styles as object), ...sizes?.[prop], ...customPredefinedStyles};
            }
        });
    }

    Object.keys(props).forEach(prop => {
        const customProp = prop as never;
        const customShortcut = shortcutStyles?.[customProp];
        if (customShortcut) {
            if (styles) styles[customShortcut] = props[customProp];
        } else {
            const customPredefinedStyles = predefinedStyles?.[customProp] as object;
            styles = {...(styles as object), ...customPredefinedStyles, ...sizes?.[prop]};
        }
    });

    return {...(styles as object)};
};

export const getTextStyleShortcuts = (props: UseThemeType, t?: 'light' | 'dark') => {
    let styles = {} as object;

    const predefinedTextStyles = getTextStyles(t || 'light');

    Object.keys(props).forEach(prop => {
        const customProp = prop as never;
        const customPredefinedTextStyles = predefinedTextStyles?.[customProp] as object;
        styles = {...styles, ...customPredefinedTextStyles, ...sizes?.[prop]};
    });

    return styles;
};
