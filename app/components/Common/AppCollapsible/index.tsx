import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent, Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

export type AppCollapsibleType = {
  title: string | ReactElement;
  collapseHeaderHeight?: number;
  defaultHeight?: number;
  children: ReactElement;
  style?: StyleProp<ViewStyle>;
  isOpen?: boolean;
};

const AppCollapsible = ({title, collapseHeaderHeight = 56, defaultHeight = 0, children = <></>, style = {}, isOpen = false}: AppCollapsibleType) => {
  const titleType = typeof title;

  const heightAnim = useSharedValue(defaultHeight);
  const heightStyles = useAnimatedStyle(() => {
    return {
      overflow: 'hidden',
      height: withTiming(heightAnim.value, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const [layoutHeight, setLayoutHeight] = useState(0);
  const [isCollapseOpen, setIsCollapseOpen] = useState(isOpen);

  const toggle = useCallback(() => {
    const finalValue = isCollapseOpen ? defaultHeight : layoutHeight + 1;
    setIsCollapseOpen(!isCollapseOpen);
    heightAnim.value = finalValue;
  }, [isCollapseOpen, layoutHeight]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    console.log(height);
    setLayoutHeight(height);
  }, []);

  useEffect(() => {
    if (isCollapseOpen) {
      heightAnim.value = layoutHeight + 1;
    }
  }, [layoutHeight]);

  return (
    <Block style={style} rounded-10 mt-10 overflow="hidden">
      <Block bg-card s={isCollapseOpen ? 'borderBottom' : ''} h={collapseHeaderHeight}>
        <Pressable onPress={toggle}>
          <Block row py-16 justify="space-between" px-30>
            <Block flex-1>{titleType === 'string' ? <Text medium>{title as string}</Text> : title}</Block>
            <Block>
              <AppIcon name={isCollapseOpen ? 'chevronUp' : 'chevronDown'} size={24} />
            </Block>
          </Block>
        </Pressable>
      </Block>

      <Block animated style={[heightStyles]}>
        <Block bg-card onLayout={onLayout} style={styles.contentStyle}>
          {children}
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    position: 'absolute',
    width: '100%',
  },
});

export default memo(AppCollapsible);
