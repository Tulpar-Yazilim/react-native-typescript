/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Images} from '@assets';
import {useSelector} from 'react-redux';
import lang from '@lang';
import {settingActions} from '@actions';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = ({navigation}: any) => {
  const isLogin = useSelector(state => state.authReducer.isLoggedIn);

  const onChangeLang = (lang: string) => {
    settingActions.changeLanguage(lang);
  };

  return (
    <View style={{paddingRight: 20, paddingLeft: 20}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
          marginBottom: 10,
        }}>
        <Image source={Images.TulparLogo} />
      </View>
      <Text style={{paddingBottom: 10, paddingTop: 10, textAlign: 'center'}}>
        Giriş {isLogin ? 'Yapılmış' : 'Yapılmamış'}{' '}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('DetailPage')}>
        <View
          style={{
            backgroundColor: 'black',
            width: '100%',
            height: 30,
            borderRadius: 15,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 17,
              }}>
              {lang('hello')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onChangeLang('tr')}>
        <Text>Türkçe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onChangeLang('en')}>
        <Text>İngilizce</Text>
      </TouchableOpacity>
      <Icon name="rocket" size={30} color="#900" />
    </View>
  );
};

export default HomePage;
