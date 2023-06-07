import React, {memo, ReactNode} from 'react';
import {Keyboard, Pressable, ScrollView, View, ViewStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

import layout from '../../../config/layout.json';
import {getStyleShortcuts} from '../../../utils/style-shortcuts';

import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {Header} from '@/navigation';
import {bottomTabHeight, window} from '@/theme';
import {heightPixel, UseThemeType} from '@/utils';

type Props<T> = {
  scroll?: boolean;
  safe?: boolean;
  keyboardScroll?: boolean;
  customStyle?: ViewStyle;
  navigationOptions?: StackNavigationOptions;
  flatList?: boolean;
  children: ReactNode;
  loading?: boolean;
  title?: string;
  navigation?: T;
};

function AppScreen<T>(props: Props<T>) {
  const {children, title, scroll, safe, keyboardScroll, customStyle, navigationOptions, flatList, loading} = props;
  const navigation = useNavigation();
  const {colors} = useTheme();
  const screenProps = props as UseThemeType;

  const screenCommonStyles = {
    padding: heightPixel(window.offset),
    paddingBottom: layout.menu === 'bottom' ? heightPixel(bottomTabHeight) : heightPixel(20),
    flex: 1,
    backgroundColor: colors.screenBgColor,
    ...customStyle,
  };

  return (
    <>
      <Header title={title} navigationOptions={navigationOptions} navigation={navigation} />
      {loading ? (
        <Text>loading</Text>
      ) : (
        <>
          {scroll && safe && !keyboardScroll && (
            <ScrollView style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <Pressable
                onPress={() => Keyboard.dismiss()}
                style={[
                  {
                    paddingBottom: layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                  },
                ]}>
                <SafeAreaView>{children}</SafeAreaView>
              </Pressable>
            </ScrollView>
          )}
          {scroll && !safe && (
            <ScrollView style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <Pressable
                style={{
                  minHeight: '100%',
                }}
                onPress={() => Keyboard.dismiss()}>
                <View
                  style={[
                    {
                      paddingBottom: layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                    },
                  ]}>
                  {children}
                </View>
              </Pressable>
            </ScrollView>
          )}
          {!scroll && safe && !keyboardScroll && (
            <SafeAreaView
              style={[
                {
                  ...screenCommonStyles,
                },
                {...getStyleShortcuts(screenProps)},
              ]}>
              <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
                {children}
              </Pressable>
            </SafeAreaView>
          )}
          {keyboardScroll && !safe && (
            <KeyboardAwareScrollView
              style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={scroll}
              contentContainerStyle={{...getStyleShortcuts(screenProps)}}>
              <Pressable
                style={{
                  minHeight: '100%',
                }}
                onPress={() => Keyboard.dismiss()}>
                <View
                  style={[
                    {
                      paddingBottom: layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
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
              style={[
                {
                  ...screenCommonStyles,
                },
                {...getStyleShortcuts(screenProps)},
              ]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flex: 1,
              }}
              scrollEnabled={scroll}>
              <SafeAreaView>{children}</SafeAreaView>
            </KeyboardAwareScrollView>
          )}
          {!scroll && !safe && !keyboardScroll && !flatList && (
            <Block pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
              <View
                style={[
                  {
                    ...screenCommonStyles,
                    flex: 1,
                  },
                  {...getStyleShortcuts(screenProps)},
                ]}>
                {children}
              </View>
            </Block>
          )}
          {flatList && (
            <View
              style={[
                {
                  ...screenCommonStyles,
                  flex: 1,
                },
                {...getStyleShortcuts(screenProps)},
              ]}>
              {children}
            </View>
          )}
        </>
      )}
    </>
  );
}

export default memo(AppScreen);
