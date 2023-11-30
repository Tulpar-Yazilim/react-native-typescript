import React, {memo, useCallback, useEffect, useState} from 'react';
import {LayoutChangeEvent, Pressable} from 'react-native';

import {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {AppCollapsibleType} from './app-collapsible';
import {styles} from './styles';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

const AppCollapsible = (props: AppCollapsibleType) => {
  const {title, collapseHeaderHeight = 56, defaultHeight = 0, children = <></>, style = {}, isOpen = false} = props;

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

export default memo(AppCollapsible);
