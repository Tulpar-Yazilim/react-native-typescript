import React, {memo, ReactNode, useState} from 'react';
import {ImageResizeMode, Keyboard, Pressable, ScrollView, StyleProp, View, ViewStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import Config from 'react-native-config';
import {RefreshControl} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {Header} from '@/navigation';
import {bottomTabHeight, generalStyles, window} from '@/theme';
import {getStyleShortcuts, heightPixel, UseThemeType} from '@/utils';

type Props = {
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
  onRefreshData?: () => void;
  backgroundImage?: string;
  backgroundResizeMode?: ImageResizeMode;
};

function AppScreen(props: Readonly<Props>) {
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
    padding: heightPixel(window.offset),
    paddingBottom: Config.MENU === 'tab' ? heightPixel(bottomTabHeight) : heightPixel(20),
    backgroundColor: !backgroundImage && colors.screenBgColor,
    ...generalStyles.flex,
    ...customStyle,
  };

  const scrollViewStyles = [screenCommonStyles as StyleProp<ViewStyle>, getStyleShortcuts(screenProps) as StyleProp<ViewStyle>];

  return (
    <>
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
                      paddingBottom: Config.MENU === 'tab' ? bottomTabHeight + 20 : 50,
                    },
                  ]}>
                  <SafeAreaView>{children}</SafeAreaView>
                </Pressable>
              </ScrollView>
            )}
            {scroll && !safe && (
              <ScrollView style={scrollViewStyles} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Pressable
                  style={{
                    minHeight: '100%',
                  }}
                  onPress={() => Keyboard.dismiss()}>
                  <View
                    style={[
                      {
                        paddingBottom: Config.MENU === 'tab' ? bottomTabHeight + 20 : 50,
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
                <Pressable
                  style={{
                    minHeight: '100%',
                  }}
                  onPress={() => Keyboard.dismiss()}>
                  <View
                    style={[
                      {
                        paddingBottom: Config.MENU === 'tab' ? bottomTabHeight + 20 : 50,
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
    </>
  );
}

export default memo(AppScreen);
