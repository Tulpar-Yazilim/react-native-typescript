import React, {memo, ReactNode, useState} from 'react';
import {ImageBackground, Keyboard, Pressable, ScrollView, StyleSheet, View, ViewStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {RefreshControl} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {Header} from '@/navigation';
import {bottomTabHeight, window} from '@/theme';
import {heightPixel, UseThemeType} from '@/utils';

import layout from '../../../config/layout.json';
import {getStyleShortcuts} from '../../../utils/style-shortcuts';

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
  canGoBack?: boolean;
  navigation?: T;
  onRefreshData?: () => void;
  backgroundImage?: string;
};

function AppScreen<T>(props: Props<T>) {
  const {children, title, scroll, safe, canGoBack, keyboardScroll, customStyle, navigationOptions, flatList, loading, backgroundImage, onRefreshData} = props;
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
    padding: heightPixel(window.offset),
    paddingBottom: layout.menu === 'bottom' ? heightPixel(bottomTabHeight) : heightPixel(20),
    flex: 1,
    backgroundColor: !backgroundImage && colors.screenBgColor,
    ...customStyle,
  };

  const Container = backgroundImage ? ImageBackground : Block;

  return (
    <>
      <Header title={title} canGoBack={canGoBack} navigationOptions={navigationOptions} navigation={navigation} />
      {loading ? (
        <Text>loading</Text>
      ) : (
        <Container source={backgroundImage || ''} resizeMode={'cover'} style={styles.container}>
          <>
            {scroll && safe && !keyboardScroll && (
              <ScrollView
                style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}}
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
        </Container>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(AppScreen);
