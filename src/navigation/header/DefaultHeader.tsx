/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {Text, View, Alert} from 'react-native';
import {Icon} from '../../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const HeaderRight: FC<any> = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={{
          padding: 16,
          flexDirection: 'row',
          borderColor: '#dedede',
          borderWidth: 1,
        }}
        onPress={() => Alert.alert('asdlfkjasdlşfkj')}>
        <Icon name="Car" />
        <Text style={{marginLeft: 10}}>Default</Text>
      </TouchableOpacity>
    </View>
  );
};

export const createNavigationOptions = (props: any) => {
  const {screen} = props;
  const options = {
    // headerRight: () => <HeaderRight {...props} />,
    headerStyle: {},
    headerTitle: screen.title,
    // headerBackTitleVisible: false,
    headerTruncatedBackTitle: '',
    // headerBackImage: () => <View style={{ paddingLeft: 16, paddingRight: 5 }}><Icon name="Car" /></View>,
    headerBackImageStyle: {},
    headerBackTitleStyle: {
      fontSize: 15,
    },
    headerRightContainerStyle: {},
    headerLeftContainerStyle: {},
    headerTitleStyle: {
      fontSize: 15,
    },
  };

  return screen.headerShown ? options : {headerShown: false};
};
