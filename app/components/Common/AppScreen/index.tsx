/* eslint-disable react-native/no-inline-styles */
import {Text} from '@/components';
import {useTheme} from '@/hooks';
import {bottomTabHeight, window} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import React, {FC, memo} from 'react';
import {Keyboard, Pressable, ScrollView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import layout from '../../../config/layout.json';
import {Header} from '../../../navigation/components/DefaultHeader';
import {getStyleShortcuts} from '../../../utils/style-shortcuts';

type Props = {
    scroll?: boolean;
    safe?: boolean;
    keyboardScroll?: boolean;
    customStyle?: any;
    navigationOptions?: any;
    flatList?: boolean;
};

const AppScreen: FC<Props | any> = ({children, ...props}) => {
    const {scroll, safe, keyboardScroll, customStyle, navigationOptions, flatList, loading} = props;
    const navigation = useNavigation();
    const {colors} = useTheme();

    const screenCommonStyles = {
        padding: window.offset,
        paddingBottom: layout.menu === 'bottom' ? bottomTabHeight : 20,
        flex: 1,
        backgroundColor: colors.screenBgColor,
        ...customStyle,
    };

    return (
        <>
            <Header navigationOptions={navigationOptions} navigation={navigation} />
            {loading ? (
                <Text>Loading ... </Text>
            ) : (
                <>
                    {scroll && safe && !keyboardScroll && (
                        <ScrollView style={{...screenCommonStyles, ...getStyleShortcuts(props)}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
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
                        <ScrollView style={{...screenCommonStyles, ...getStyleShortcuts(props)}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
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
                                {...getStyleShortcuts(props)},
                            ]}>
                            <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
                                {children}
                            </Pressable>
                        </SafeAreaView>
                    )}
                    {keyboardScroll && !safe && (
                        <KeyboardAwareScrollView
                            style={{...screenCommonStyles, ...getStyleShortcuts(props)}}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={scroll}
                            contentContainerStyle={{...getStyleShortcuts(props)}}>
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
                                        getStyleShortcuts(props),
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
                                {...getStyleShortcuts(props)},
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
                        <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
                            <View
                                style={[
                                    {
                                        ...screenCommonStyles,
                                        flex: 1,
                                    },
                                    {...getStyleShortcuts(props)},
                                ]}>
                                {children}
                            </View>
                        </Pressable>
                    )}
                    {flatList && (
                        <View
                            style={[
                                {
                                    ...screenCommonStyles,
                                    flex: 1,
                                },
                                {...getStyleShortcuts(props)},
                            ]}>
                            {children}
                        </View>
                    )}
                </>
            )}
        </>
    );
};

export default memo(AppScreen);
