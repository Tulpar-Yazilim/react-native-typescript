import React, {memo} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';

import {SIZES, COLORS} from './Config';
import {getMargins, getPaddings} from '@utils';

import LoadingScreen from '../components/common/LoadingScreen';
import LoadingCard from '../components/common/LoadingCard';

const Block = (props: any) => {
  const {
    // loading
    preloader = false,
    loading = null,

    flex = 0 || false,
    noflex = true,
    row = false,
    column = false,
    center = false,
    middle = false,
    left = false,
    right = false,
    top = false,
    bottom = false,
    card = false,
    shadow = null,
    elevation = 3,

    // colors
    color = null,
    primary = false,
    secondary = false,
    tertiary = false,
    black = false,
    white = false,
    gray = false,
    error = false,
    warning = false,
    success = false,
    info = false,

    // size & positioning
    width = null,
    height = null,
    space = null,
    radius = null,
    wrap = false,

    // variations
    animated = false,
    scroll = false,
    children = null,

    // sizing props
    margin,
    m,
    marginHorizontal,
    mx,
    marginVertical,
    my,
    marginTop,
    mt,
    marginBottom,
    mb,
    marginLeft,
    ml,
    marginRight,
    mr,
    padding,
    p,
    paddingHorizontal,
    px,
    paddingVertical,
    py,
    paddingTop,
    pt,
    paddingBottom,
    pb,
    paddingLeft,
    pl,
    paddingRight,
    pr,

    // custom styling
    style = {},
    preloaderStyle,
    // extra props
    zIndex = null,
    overlow = false,

    ...rest
  } = props;

  const marginSpacing = getMargins({
    margin,
    m,
    marginHorizontal,
    mx,
    marginVertical,
    my,
    marginTop,
    mt,
    marginBottom,
    mb,
    marginLeft,
    ml,
    marginRight,
    mr,
    defaultValue: SIZES.base,
  });
  const paddingSpacing = getPaddings({
    padding,
    p,
    paddingHorizontal,
    px,
    paddingVertical,
    py,
    paddingTop,
    pt,
    paddingBottom,
    pb,
    paddingLeft,
    pl,
    paddingRight,
    pr,
    defaultValue: SIZES.base,
  });

  const blockStyles = StyleSheet.flatten([
    styles.block,
    noflex && {flex: 0},
    flex && {flex: flex === true ? 1 : flex},
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    marginSpacing,
    paddingSpacing,
    wrap && styles.wrap,
    shadow && {
      shadowColor: '#707070',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: elevation,
    },
    space && {justifyContent: `space-${space}`},
    card && {borderRadius: SIZES.radius},
    radius && {borderRadius: radius},
    // color shortcuts
    primary && {backgroundColor: COLORS.primary},
    secondary && {backgroundColor: COLORS.secondary},
    tertiary && {backgroundColor: COLORS.tertiary},
    black && {backgroundColor: COLORS.black},
    white && {backgroundColor: COLORS.white},
    gray && {backgroundColor: COLORS.gray},
    error && {backgroundColor: COLORS.error},
    warning && {backgroundColor: COLORS.warning},
    success && {backgroundColor: COLORS.success},
    info && {backgroundColor: COLORS.info},
    color && {backgroundColor: color}, // custom backgroundColor
    row && {flex: 0},
    width && {width},
    height && {height},

    overlow && {overflow: 'hidden'},
    zIndex && {zIndex: zIndex},
    style, // rewrite predefined styles
  ]);

  if (scroll) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={blockStyles}
        {...rest}>
        {children}
      </ScrollView>
    );
  }

  if (animated) {
    return (
      <Animated.View {...rest} style={blockStyles}>
        {children}
      </Animated.View>
    );
  }

  return (
    <View {...rest} style={blockStyles}>
      {loading && <LoadingScreen />}
      {preloader && (
        <LoadingCard
          width={width}
          height={height}
          style={[
            preloaderStyle,
            {
              width: width,
            },
          ]}
        />
      )}
      {children}
    </View>
  );
};

export default memo(Block);

export const styles = StyleSheet.create({
  block: {
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
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  wrap: {flexWrap: 'wrap'},
});
