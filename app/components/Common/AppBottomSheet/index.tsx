import React, {forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import {Pressable, StatusBar, StyleSheet} from 'react-native';

import BottomSheet, {BottomSheetBackdropProps, BottomSheetScrollView, BottomSheetView, useBottomSheetTimingConfigs} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Portal} from 'react-native-portalize';
import Animated, {Easing, Extrapolation, interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {useTheme, useThemeMode} from '@/hooks';
import {COLORS, generalStyles, SCREEN} from '@/theme';
import {heightPixel, rgba} from '@/utils';

import {AppBottomSheetProps} from './app-bottom-sheet';
import Block from '../Block';

const AppBottomSheet = (props: AppBottomSheetProps, ref: Ref<BottomSheetMethods>) => {
  const {children, enablePanDownToClose = true, backdrop = true, onClose = () => {}, portal = true, isFlatList = false, isVisible = false, customStyles = {}} = props;

  const themeMode = useThemeMode();
  const {colors} = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 200,
    easing: Easing.inOut(Easing.linear),
  });

  useImperativeHandle(ref, () => ({
    snapToIndex: (value: number) => bottomSheetRef?.current?.snapToIndex?.(value),
    snapToPosition: (position: string | number) => bottomSheetRef?.current?.snapToPosition?.(position, animationConfigs),
    expand: () => bottomSheetRef?.current?.expand?.(),
    collapse: () => bottomSheetRef?.current?.collapse?.(),
    close: () => bottomSheetRef?.current?.close?.(),
    forceClose: () => bottomSheetRef?.current?.forceClose?.(),
  }));

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomBackdrop = ({style}: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(isVisible ? 1 : 0, [0, 1], [0, 1], Extrapolation.CLAMP),
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
          style={generalStyles.flex}
          onPress={() => {
            bottomSheetRef.current?.close();
          }}
        />
      </Animated.View>
    );
  };
  const BackdropComponent = isVisible && backdrop ? CustomBackdrop : null;

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const Provider = portal ? Portal : React.Fragment;

  return (
    <Provider>
      <BottomSheet
        {...props}
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing
        topInset={StatusBar.currentHeight ?? 0}
        onClose={onClose}
        backdropComponent={BackdropComponent}
        handleIndicatorStyle={{
          backgroundColor: themeMode === 'dark' ? colors?.gray : colors?.black,
        }}
        animationConfigs={animationConfigs}
        keyboardBlurBehavior="restore">
        <Block flex>
          {isFlatList ? (
            <BottomSheetView style={[styles.bottomSheetView, customStyles]}>{children}</BottomSheetView>
          ) : (
            <BottomSheetScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={[
                styles.bottomSheetView,
                customStyles,
                {
                  maxHeight: SCREEN.height - heightPixel(180),
                },
              ]}>
              {children}
            </BottomSheetScrollView>
          )}
        </Block>
      </BottomSheet>
    </Provider>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    paddingBottom: 30,
  },
});

export default forwardRef(AppBottomSheet);
