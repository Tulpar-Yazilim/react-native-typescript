import React, {useEffect, useState} from 'react';
import {BackHandler, Keyboard, Pressable, StyleSheet} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {random} from 'lodash';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import {useTheme} from '@/hooks';
import {RootStackNavigationRouteType} from '@/navigation';
import {DialogAction} from '@/utils';

import AppInput from '../AppInput';
import Block from '../Block';
import Text from '../Text';

export default function Alert() {
  const navigation: StackNavigationProp<never> = useNavigation();
  const route = useRoute<RootStackNavigationRouteType<'ALERT'>>();
  const theme = useTheme();
  const {title, message, action, option, position, alertType, placeholder} = route.params;

  const [promptText, setPromptText] = useState<string>('');

  //#region Animation
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    if (position === 'bottom') {
      return {
        bottom: offset.value,
      };
    } else if (position === 'left') {
      return {
        flex: 1,
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: offset.value - 50,
      };
    } else if (position === 'right') {
      return {
        flex: 1,
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        right: offset.value - 50,
      };
    } else {
      return {
        top: offset.value,
      };
    }
  });
  //#endregion

  //#region BackHandler
  useEffect(() => {
    const backAction = () => {
      navigation.canGoBack() && navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  //#endregion

  //#region Action Button
  const AcionButton = ({item}: {item: DialogAction}) => {
    return (
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: item.style === 'confirm' ? theme.colors.primary : theme.colors.error,
            marginLeft: action && action?.length > 1 ? 5 : 0,
          },
        ]}
        onPress={() => {
          if (alertType === 'prompt') {
            if (item.style === 'confirm') {
              if (promptText?.length > 0 && option?.cancelable) {
                Keyboard.dismiss();
                item?.onPress?.(promptText);
                navigation.goBack();
              }
            } else {
              item?.onPress?.();
              if (option?.cancelable) {
                navigation.goBack();
              }
            }
          } else {
            item?.onPress?.();
            if (option?.cancelable) {
              navigation.goBack();
            }
          }
        }}>
        <Text medium white>
          {item?.text}
        </Text>
      </Pressable>
    );
  };
  //#endregion

  useEffect(() => {
    offset.value = withSpring(50);
    return () => {
      offset.value = 0;
    };
  }, [offset]);

  return (
    <React.Fragment>
      {option?.backgroundClose && <Pressable style={styles.bg} onPress={() => navigation.goBack()} />}

      <Animated.View style={[styles.contain, animatedStyles]}>
        <Block style={[styles.content, {backgroundColor: theme.colors.cardBg}]}>
          <Block>
            <Block borderBottom>
              <Text py-15 px-15 black bold>
                {title}
              </Text>
            </Block>

            <Text p-15 black>
              {message}
            </Text>
          </Block>
          {alertType === 'prompt' && (
            <Block bg-lightGrey py-10 px-15>
              <AppInput placeholder={placeholder} value={promptText} onChangeText={(text: string) => setPromptText(text)} />
            </Block>
          )}
          <Block style={[styles.contentButton, {justifyContent: action?.length === 1 ? 'center' : 'flex-end'}]}>
            {action?.map(item => (
              <AcionButton key={`${random(1000)}_action_button`} item={item} />
            ))}
          </Block>
        </Block>
      </Animated.View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    zIndex: -2,
  },
  contain: {
    zIndex: 9999,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  content: {
    width: '90%',
    borderRadius: 8,
  },
  contentButton: {
    justifyContent: 'flex-end',
    padding: 10,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
