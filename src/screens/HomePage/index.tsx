import React, {useState, useCallback} from 'react';
import {Pressable} from 'react-native';
import {Images} from '@assets';
import {useSelector} from 'react-redux';
import {Text} from '@theme';
import {AppImage, AppIcon, AppScreen, AppButton} from '@components';
import {requestPermissions, checkPermissions, PermissionsList} from '@utils';
import {useFocusEffect} from '@react-navigation/native';
import {RootState, settingsRedux} from '@store';
import {Block} from '../../components/common/Block/Block';
import Routes from '../../navigation/Routes';

const HomePage = ({navigation}: any) => {
  const [isPermission, setIsPermission] = useState(false);

  const language = useSelector<RootState>(({settings}) => settings.language);

  const onChangeLang = (_language: string) => {
    settingsRedux.actions.changeLanguage(_language);
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
    <AppScreen>
      <Block>
        <Block center middle mt={25} mb={10}>
          <AppImage
            resizeMode="contain"
            url={Images.TulparLogo}
            width={200}
            height={60}
          />
        </Block>
        <Text py={10}>Dil: {language}</Text>

        <Text>ÖMER AKYOL</Text>
        <Text pb={10}>MALİK KORUCU</Text>

        <AppButton
          mb={10}
          type="primary"
          title={'Detay Sayfası'}
          onPress={() => {
            navigation.navigate(Routes.HOME_DETAIL_SCREEN);
          }}
        />

        <AppButton
          mb={10}
          type="primary"
          title={'Türkçe'}
          onPress={() => onChangeLang('tr')}
        />

        <AppButton
          type="primary"
          title={'İngilizce'}
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
    </AppScreen>
  );
};

export default HomePage;
