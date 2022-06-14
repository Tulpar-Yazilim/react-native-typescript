/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppSvgIcon, AppScreen} from '@components';
import {IconTypes} from '@assets';

const HeaderRight: FC<any> = ({setCount, count}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => setCount(count + 1)}>
        <AppSvgIcon name={IconTypes.ArrowBack} />
        <Text style={{marginLeft: 10}}>Custom</Text>
      </TouchableOpacity>
    </View>
  );
};

export const HomeDetail: FC<any> = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  // Page specific header options !
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight count={count} setCount={setCount} />,
    });
  }, [navigation, count]);

  return <AppScreen></AppScreen>;
};

const styles = StyleSheet.create({
  headerRight: {
    padding: 16,
    flexDirection: 'row',
    borderColor: '#dedede',
    borderWidth: 1,
  },
});
