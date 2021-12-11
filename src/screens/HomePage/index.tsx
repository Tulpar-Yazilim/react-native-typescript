/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {Images} from '@assets';
import {useSelector} from 'react-redux';
import lang from '@lang';
import {settingActions} from '@actions';
import {RootState} from '@store';
import {Block, COLORS, Text} from '@theme';
import {AppImage, AppIcon, AppPage} from '@components';
import {requestPermissions, permissionsControll, PermissionsList} from '@utils';
import {useFocusEffect} from '@react-navigation/native';

const HomePage = ({navigation}: any) => {
  const [isPermission, setIsPermission] = useState(false);
  const isLogin = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn,
  );

  const onChangeLang = (lang: string) => {
    settingActions.changeLanguage(lang);
  };

  const cameraPermissions = async () => {
    const cameraPermissionsStatus: any = await requestPermissions(
      PermissionsList.camera,
    );
    setIsPermission(cameraPermissionsStatus);
  };

  const isSCameraPermissionsCheck = async () => {
    const isCheckPermission: any = await permissionsControll(
      PermissionsList.camera,
    );
    setIsPermission(isCheckPermission);
  };

  useFocusEffect(
    useCallback(() => {
      isSCameraPermissionsCheck();
    }, []),
  );

  return (
    <AppPage scroll>
      <Block paddingLeft={10} paddingRight={10}>
        <Block noflex center middle marginTop={25} marginBottom={10}>
          <AppImage url={Images.TulparLogo} width={200} height={60} />
        </Block>
        <Text style={{paddingBottom: 10, paddingTop: 10, textAlign: 'center'}}>
          Giriş {isLogin ? 'Yapılmış' : 'Yapılmamış'}{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('DetailPage')}>
          <Block noflex radius={15} backgroundColor={COLORS.black} height={30}>
            <Block center middle>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 17,
                }}>
                {lang('hello')}
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangeLang('tr')}>
          <Block marginTop={10} noflex center middle>
            <Text>Türkçe</Text>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeLang('en')}>
          <Block marginTop={10} noflex center middle>
            <Text>İngilizce</Text>
          </Block>
        </TouchableOpacity>
        <Block noflex marginTop={20} center middle>
          <AppIcon name="rocket" size={30} color="#900" />
        </Block>
        <Block>
          {isPermission ? (
            <Text center>{lang('camera_permissions')}</Text>
          ) : (
            <TouchableOpacity onPress={cameraPermissions}>
              <Text center>{lang('permissions')}</Text>
            </TouchableOpacity>
          )}
        </Block>
      </Block>
    </AppPage>
  );
};

export default HomePage;
