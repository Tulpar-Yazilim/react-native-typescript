import React, {memo, useState} from 'react';
import {Keyboard, Pressable, ScrollView, StyleProp, View, ViewStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {RefreshControl} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {Header} from '@/navigation';
import {BOTTOM_TAB_HEIGHT, generalStyles, SCREEN} from '@/theme';
import {getStyleShortcuts, heightPixel, UseThemeType} from '@/utils';

import {ScreenProps} from './app-screen';

function AppScreen(props: Readonly<ScreenProps>) {
  const {children, title, scroll, safe, canGoBack, keyboardScroll, customStyle, navigationOptions, flatList, loading, backgroundImage, backgroundResizeMode, onRefreshData} = props;

  const navigation = useNavigation();
  const {colors} = useTheme();
  const screenProps = props as UseThemeType;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await onRefreshData?.();
    setRefreshing(false);
  };

  const screenCommonStyles = {
    padding: heightPixel(SCREEN.offset),
    paddingBottom: Config.MENU === 'tab' ? heightPixel(BOTTOM_TAB_HEIGHT) : heightPixel(20),
    backgroundColor: !backgroundImage && colors.screenBgColor,
    ...generalStyles.flex,
    ...generalStyles.flexGrow,
    ...customStyle,
  };

  const scrollViewStyles = [screenCommonStyles as StyleProp<ViewStyle>, getStyleShortcuts(screenProps) as StyleProp<ViewStyle>];

  return (
    <React.Fragment>
      <Header title={title} canGoBack={canGoBack} navigationOptions={navigationOptions} navigation={navigation} />
      {loading ? (
        <Text>loading</Text>
      ) : (
        <Block flex backgroundImage={backgroundImage} resizeMode={backgroundResizeMode}>
          <>
            {scroll && safe && !keyboardScroll && (
              <ScrollView
                style={scrollViewStyles}
                refreshControl={
                  onRefreshData ? (
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                        onRefresh?.();
                      }}
                    />
                  ) : undefined
                }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <Pressable
                  onPress={() => Keyboard.dismiss()}
                  style={[
                    {
                      paddingBottom: Config.MENU === 'tab' ? BOTTOM_TAB_HEIGHT + 20 : 50,
                    },
                  ]}>
                  <SafeAreaView>{children}</SafeAreaView>
                </Pressable>
              </ScrollView>
            )}
            {scroll && !safe && (
              <ScrollView style={scrollViewStyles} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Pressable style={generalStyles.fullMinHeight} onPress={() => Keyboard.dismiss()}>
                  <View
                    style={[
                      {
                        paddingBottom: Config.MENU === 'tab' ? BOTTOM_TAB_HEIGHT + 20 : 50,
                      },
                    ]}>
                    {children}
                  </View>
                </Pressable>
              </ScrollView>
            )}
            {!scroll && safe && !keyboardScroll && (
              <SafeAreaView style={scrollViewStyles}>
                <Pressable style={generalStyles.flex} onPress={() => Keyboard.dismiss()}>
                  {children}
                </Pressable>
              </SafeAreaView>
            )}
            {keyboardScroll && !safe && (
              <KeyboardAwareScrollView
                style={scrollViewStyles}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={scroll}
                contentContainerStyle={{...getStyleShortcuts(screenProps)}}>
                <Pressable style={generalStyles.fullMinHeight} onPress={() => Keyboard.dismiss()}>
                  <View
                    style={[
                      {
                        paddingBottom: Config.MENU === 'tab' ? BOTTOM_TAB_HEIGHT + 20 : 50,
                      },
                      getStyleShortcuts(screenProps),
                    ]}>
                    {children}
                  </View>
                </Pressable>
              </KeyboardAwareScrollView>
            )}
            {keyboardScroll && safe && (
              <KeyboardAwareScrollView
                style={scrollViewStyles}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={generalStyles.flex}
                scrollEnabled={scroll}>
                <SafeAreaView>{children}</SafeAreaView>
              </KeyboardAwareScrollView>
            )}
            {!scroll && !safe && !keyboardScroll && !flatList && (
              <Block flex pressable onPress={() => Keyboard.dismiss()}>
                <View style={[scrollViewStyles, generalStyles.flex]}>{children}</View>
              </Block>
            )}
            {flatList && <View style={[scrollViewStyles, generalStyles.flex]}>{children}</View>}
          </>
        </Block>
      )}
    </React.Fragment>
  );
}

export default memo(AppScreen);
