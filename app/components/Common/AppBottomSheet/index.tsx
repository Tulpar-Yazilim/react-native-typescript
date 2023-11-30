/* eslint-disable react/no-unstable-nested-components */
import React, {forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import {Pressable, StatusBar, StyleSheet} from 'react-native';

import BottomSheet, {BottomSheetBackdropProps, BottomSheetScrollView, BottomSheetView, useBottomSheetDynamicSnapPoints, useBottomSheetTimingConfigs} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Portal} from 'react-native-portalize';
import Animated, {Easing, Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {useTheme, useThemeMode} from '@/hooks';
import {COLORS, generalStyles, SCREEN} from '@/theme';
import {heightPixel, rgba} from '@/utils';

import {AppBottomSheetProps} from './app-bottom-sheet';
import Block from '../Block';

const AppBottomSheet = (props: AppBottomSheetProps, ref: Ref<BottomSheetMethods>) => {
  const {children = <></>, enablePanDownToClose = true, backdrop = true, onClose = () => {}, portal = true, isFlatList = false, isVisible = false, snapPoints, customStyles = {}} = props;

  const themeMode = useThemeMode();
  const {colors} = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const initialSnapPoints = useMemo(() => snapPoints ?? ['CONTENT_HEIGHT'], [snapPoints]);
  const {animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout} = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 200,
    easing: Easing.inOut(Easing.linear),
  });

  useImperativeHandle(ref, () => ({
    snapToIndex: (value: number) => bottomSheetRef?.current?.snapToIndex?.(value),
    snapToPosition: () => {},
    expand: () => {},
    collapse: () => {},
    close: () => {},
    forceClose: () => {},
  }));

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
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        topInset={StatusBar.currentHeight ?? 0}
        onClose={onClose}
        backdropComponent={BackdropComponent}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
        }}
        handleIndicatorStyle={{
          backgroundColor: themeMode === 'dark' ? colors?.gray : colors?.black,
        }}
        animationConfigs={animationConfigs}
        keyboardBlurBehavior="restore">
        <Block flex>
          {isFlatList ? (
            <BottomSheetView onLayout={handleContentLayout} style={[styles.bottomSheetView, customStyles]}>
              {children}
            </BottomSheetView>
          ) : (
            <BottomSheetScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onLayout={handleContentLayout}
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
