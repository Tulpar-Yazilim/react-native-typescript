import React, {forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useRef} from 'react';
import {Pressable, StatusBar, StyleSheet, ViewStyle} from 'react-native';

import BottomSheet, {BottomSheetBackdropProps, BottomSheetProps, BottomSheetScrollView, BottomSheetView, useBottomSheetDynamicSnapPoints, useBottomSheetTimingConfigs} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {Portal} from 'react-native-portalize';
import Animated, {Easing, Extrapolate, interpolate, useAnimatedStyle} from 'react-native-reanimated';

import Block from '../Block';

import {COLORS, window} from '@/theme';
import {heightPixel, rgba} from '@/utils';

interface AppBottomSheetProps extends BottomSheetProps {
  children: ReactNode;
  backdrop?: boolean;
  portal?: boolean;
  customStyles?: ViewStyle;
  isFlatList?: boolean;
  isVisible?: boolean;
}

const AppBottomSheet = (props: AppBottomSheetProps, ref: Ref<BottomSheetMethods>) => {
  const {children = <></>, enablePanDownToClose = true, backdrop = true, onClose = () => {}, portal = true, isFlatList = false, isVisible = false, customStyles = {}} = props;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {animatedHandleHeight, animatedContentHeight, handleContentLayout} = useBottomSheetDynamicSnapPoints([200]);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 200,
    easing: Easing.inOut(Easing.linear),
  });

  useImperativeHandle(ref, () => ({
    snapToIndex: (value: number) => {
      bottomSheetRef.current && bottomSheetRef.current.snapToIndex(value);
    },
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
          style={{flex: 1}}
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
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const Provider = portal ? Portal : React.Fragment;

  return (
    <Provider>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose={enablePanDownToClose}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        topInset={StatusBar.currentHeight || 0}
        onClose={onClose}
        backdropComponent={BackdropComponent}
        style={{
          //...SIZES.shadow,
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: 'red',
        }}
        animationConfigs={animationConfigs}
        {...props}>
        <Block style={{flex: 1}}>
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
                  maxHeight: window.height - heightPixel(180),
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
