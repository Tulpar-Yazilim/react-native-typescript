import React, {FC, useState} from 'react';
//import {StyleSheet} from 'react-native';
//import {useSharedValue} from 'react-native-reanimated';

import {Block, Input, Screen} from '@components';
//navigation
export const AboutScreen: FC<any> = ({}) => {
  //const [data, setData] = useState([1, 2, 3]);
  //const sharedValue = useSharedValue(0);
  //const offset = useSharedValue(0);
  //const x = useSharedValue(0);
  //const y = useSharedValue(0);
  //const [isElementCreated, setIsElementCreated] = useState(false);

  // sharedValue.value = withRepeat(withTiming(70), 2, true);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     // transform: [{translateX: offset.value * 255}],
  //     transform: [{scale: offset.value}],
  //   };
  // });

  // useLayoutEffect(() => {
  //   if (layout.menu === 'drawer') {
  //     navigation.setOptions({
  //       drawerHideStatusBarOnOpen: true,
  //       lazy: true,
  //     });
  //   }
  // }, [navigation]);

  // const gestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, ctx: any) => {
  //     ctx.startX = x.value;
  //     ctx.startY = y.value;
  //   },
  //   onActive: (event, ctx) => {
  //     console.log('on active', event);
  //     x.value = ctx.startX + event.translationX;
  //     y.value = ctx.startY + event.translationY;
  //   },
  //   onEnd: evt => {
  //     const {absoluteX, absoluteY} = evt;
  //     if (x.value <= 4) {
  //       x.value = 0;
  //     }

  //     x.value = withDecay({
  //       velocity: evt.velocityX,
  //       clamp: [0, 400], // optionally define boundaries for the animation
  //     });
  //   },
  // });

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: x.value,
  //       },
  //       {
  //         translateY: y.value,
  //       },
  //     ],
  //   };
  // });

  // const animatedStyle_2 = useAnimatedStyle(() => ({
  //   transform: [{translateX: sharedValue.value}],
  // }));

  // sharedValue.value = withRepeat(
  //   withTiming(200, undefined, (finished, currentValue) => {
  //     if (finished) {
  //       console.log('current withRepeat value is ' + currentValue);
  //     } else {
  //       console.log('inner animation cancelled');
  //     }
  //   }),
  //   10,
  //   true,
  //   finished => {
  //     const resultStr = finished
  //       ? 'All repeats are completed'
  //       : 'withRepeat cancelled';
  //     console.log(resultStr);
  //   },
  // );

  // const RenderItem: ListRenderItem<any> = props => {
  //   const {item} = props;

  //   return (
  //     <Animated.View
  //       entering={SlideInLeft}
  //       exiting={SlideOutLeft}
  //       layout={Layout.springify()}
  //       key={item}
  //       style={{
  //         height: 50,
  //         borderWidth: 1,
  //         marginBottom: 20,
  //         width: '100%',
  //         backgroundColor: 'tomato',
  //       }}>
  //       <Pressable
  //         onPress={() => {
  //           const temp = [...data];
  //           const _data = temp.filter(el => el !== item);
  //           console.log(_data);
  //           setData(_data);
  //         }}
  //         style={{flex: 1, width: '100%', height: '100%'}}>
  //         <Text>{item}</Text>
  //       </Pressable>
  //     </Animated.View>
  //   );
  // };

  const [inputValue, setInputValue] = useState('');

  return (
    <Screen safe>
      {/* <Button
        title="add element"
        onPress={() => setData([...data, Math.random()])}
      /> */}
      {/* <Animated.View style={{flex: 1, padding: 20}}>
        <FlatList data={data} renderItem={RenderItem} />
      </Animated.View> */}
      <Block mb={10}>
        <Input
          value={inputValue}
          onChange={(text: string) => {
            setInputValue(text);
          }}
          animatedPlaceholder="Name"
        />
      </Block>
      <Input
        value={inputValue}
        onChange={(text: string) => {
          setInputValue(text);
        }}
        animatedPlaceholder="Name Name Name Name"
      />

      {/* 
      <Animated.View style={animatedStyles}>
        <View
          style={{
            width: 60,
            height: 60,
            borderWidth: 1,
            borderColor: '#dedede',
            backgroundColor: 'tomato',
            borderRadius: 15,
          }}></View>
      </Animated.View> */}
      {/* 
      <Animated.View style={animatedStyle_2}>
        <View
          style={{
            width: 60,
            height: 60,
            borderWidth: 1,
            borderColor: '#dedede',
            backgroundColor: 'tomato',
            borderRadius: 15,
          }}></View>
      </Animated.View> */}

      {/* <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </PanGestureHandler> */}

      {/* <Button
        title="Move"
        onPress={() =>
          (offset.value = withSpring(offset.value === 0.5 ? 1 : 0.5))
        }
      /> */}

      {/* <Button
        title="create element"
        onPress={() => setIsElementCreated(!isElementCreated)}
      /> */}

      {/* {isElementCreated && (
        <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
          <View
            style={{
              width: 60,
              height: 60,
              borderWidth: 1,
              borderColor: '#dedede',
              backgroundColor: 'tomato',
              borderRadius: 15,
            }}></View>
        </Animated.View>
      )} */}
    </Screen>
  );
};

//const styles = StyleSheet.create({
//  box: {
//    width: 60,
//    height: 60,
//    borderWidth: 1,
//    borderColor: '#dedede',
//    backgroundColor: 'tomato',
//    borderRadius: 15,
//  },
//});
