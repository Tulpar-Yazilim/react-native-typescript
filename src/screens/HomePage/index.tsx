/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {Pressable} from 'react-native';
import {Images} from '@assets';
import {useSelector} from 'react-redux';
import {settingsActions} from '@actions';
import {RootState} from '@store';
import {Block, COLORS, Text} from '@theme';
import {AppImage, AppIcon, AppPage, AppButton} from '@components';
import {requestPermissions, checkPermissions, PermissionsList} from '@utils';
import {useFocusEffect} from '@react-navigation/native';
import Routes from '../../navigation/Routes';

const HomePage = ({navigation}: any) => {
  const [isPermission, setIsPermission] = useState(false);

  const language = useSelector(
    (state: RootState) => state.settingsReducer.language,
  );

  const onChangeLang = (_language: string) => {
    settingsActions.changeLanguage(_language);
  };

  const cameraPermissions = async () => {
    const cameraPermissionsStatus: any = await requestPermissions(
      PermissionsList.camera,
    );
    setIsPermission(cameraPermissionsStatus);
  };

  const isSCameraPermissionsCheck = async () => {
    const isCheckPermission: any = await checkPermissions(
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
    <AppPage title="Tulpar Yazılım" scroll>
      <Block px={20}>
        <Block center middle marginTop={25} marginBottom={10}>
          <AppImage
            resizeMode="contain"
            url={Images.TulparLogo}
            width={200}
            height={60}
          />
        </Block>
        <Text py={10}>Dil: {language}</Text>

        <AppButton
          title={'Details'}
          color={COLORS.font}
          onPress={() => navigation.navigate(Routes.HOME_DETAIL_SCREEN)}
        />

        <AppButton
          mt={5}
          title={'Türkçe'}
          color={COLORS.error}
          onPress={() => onChangeLang('tr')}
        />
        <AppButton
          mt={5}
          title={'İngilizce'}
          color={COLORS.secondary}
          onPress={() => onChangeLang('en')}
        />

        <Block marginTop={20} center middle>
          <AppIcon name="camera" size={30} color="#900" />
        </Block>
        <Block>
          {isPermission ? (
            <Text center>camera_permissions</Text>
          ) : (
            <Pressable onPress={cameraPermissions}>
              <Text center>permissions</Text>
            </Pressable>
          )}
        </Block>
      </Block>
    </AppPage>
  );
};

export default HomePage;
