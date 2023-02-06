import React, {memo, useEffect, useMemo, useRef} from 'react';
import {Pressable, StatusBar, StyleSheet} from 'react-native';
import {Portal} from 'react-native-portalize';

import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  useBottomSheetTimingConfigs,
} from '@gorhom/bottom-sheet';
import Animated, {Easing, Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {COLORS, SIZES, window} from '@/theme';
import {rgba} from '@/utils';
import {useTheme} from '@/hooks';
import Block from '../Block';

const AppBottomSheet = ({
  children = <></>,
  onClose = () => {},
  isFlatList = false,
  isVisible = false,
  customStyles = {},
  ...props
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout} =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 200,
    easing: Easing.inOut(Easing.linear),
  });

  const CustomBackdrop = ({style}: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(isVisible ? 1 : 0, [0, 1], [0, 1], Extrapolate.CLAMP),
    }));

    // styles
    const containerStyle = useMemo(
      () => [
        style,
        {
          backgroundColor: rgba(COLORS.black, 0.65),
        },
        containerAnimatedStyle,
      ],
      [style, containerAnimatedStyle],
    );

    return (
      <Animated.View style={containerStyle}>
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            bottomSheetRef.current?.close();
          }}
        />
      </Animated.View>
    );
  };
  const BackdropComponent = isVisible ? CustomBackdrop : null;

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        topInset={StatusBar.currentHeight || 0}
        onClose={onClose}
        backdropComponent={BackdropComponent}
        style={SIZES.shadow}
        animationConfigs={animationConfigs}
        backgroundStyle={{
          backgroundColor: theme.colors.cardBg,
        }}
        {...props}>
        <Block>
          {isFlatList ? (
            <BottomSheetView
              onLayout={handleContentLayout}
              style={[
                styles.bottomSheetView,
                customStyles,
                {
                  backgroundColor: theme.colors.cardBg,
                  maxHeight: window.height - 100,
                },
              ]}>
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView
              onLayout={handleContentLayout}
              style={[
                styles.bottomSheetView,
                customStyles,
                {
                  backgroundColor: theme.colors.cardBg,
                  maxHeight: window.height - 100,
                },
              ]}>
              {children}
            </BottomSheetScrollView>
          )}
        </Block>
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    paddingBottom: 30,
  },
});

export default memo(AppBottomSheet);
