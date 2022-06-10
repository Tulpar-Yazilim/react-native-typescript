/* eslint-disable react-native/no-inline-styles */
import React, {FC, useLayoutEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from '../../assets/icons';
import {Screen} from '@components';

const HeaderRight: FC<any> = ({setCount, count}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => setCount(count + 1)}>
        <Icon name="Car" />
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

  return (
    <Screen>
      <Text>test</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    padding: 16,
    flexDirection: 'row',
    borderColor: '#dedede',
    borderWidth: 1,
  },
});
