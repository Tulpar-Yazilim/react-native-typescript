import React, {memo} from 'react';
import {Animated, Dimensions, StyleSheet, Text} from 'react-native';
import {useTheme, useTranslate} from '@/hooks';
import {SIZES} from '@/theme';
import {RFValue} from 'react-native-responsive-fontsize';

const Typography = (props: any) => {
    const {children, params, animated, ...rest} = props;
    const {textStyles, styles} = useTheme(props);

    // Translations
    const _translate = useTranslate(children, params);
    const i18nText = _translate ? _translate : children;

    // Content
    const content = i18nText || '';

    const insideStyles = StyleSheet.flatten([
        {
            fontSize: RFValue(SIZES.font, Dimensions.get('window').height),
        },
    ]);

    if (animated) {
        return (
            <Animated.Text {...rest} style={[insideStyles, textStyles, styles, props.styles]}>
                {content}
            </Animated.Text>
        );
    }

    return (
        <Text {...rest} style={[insideStyles, textStyles, styles, props.styles]}>
            {content}
        </Text>
    );
};

export default memo(Typography);
