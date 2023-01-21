import {Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import React, {useEffect} from 'react';
import {
  BackHandler,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function Alert({route, navigation}: any) {
  const theme = useTheme();
  const {title, message, action, option, position} = route?.params;

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
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //#endregion

  //#region Action Button
  const AcionButton = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          item?.onPress?.();
          if (option?.cancelable) {
            navigation.goBack();
          }
        }}>
        <Text bold black>
          {item?.text}
        </Text>
      </TouchableOpacity>
    );
  };
  //#endregion

  useEffect(() => {
    offset.value = withSpring(50);
    return () => {
      offset.value = 0;
    };
  }, []);

  return (
    <React.Fragment>
      {option?.backgroundClose && (
        <Pressable style={styles.bg} onPress={() => navigation.goBack()} />
      )}

      <Animated.View style={[styles.contain, animatedStyles]}>
        <Block style={[styles.content, {backgroundColor: theme.colors.cardBg}]}>
          <Block>
            <View style={styles.alertTitle}>
              <Text py-20 px-10 black>
                {title}
              </Text>
            </View>

            <Text py-15 px-10 thin black>
              {message}
            </Text>
          </Block>
          <Block style={[styles.contentButton]}>
            {action?.map((item: any, index: number) => (
              <AcionButton key={index} item={item} />
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
  alertTitle: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
  },
  contentButton: {
    justifyContent: 'flex-end',
    padding: 10,
    borderColor: 'gray',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingLeft: 20,
  },
});
