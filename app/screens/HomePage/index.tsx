import {Images} from '@assets';
import {
  AppBottomSheet,
  AppButton,
  AppIcon,
  AppImage,
  AppScreen,
  Block,
  Col,
  DateTimePicker,
  Row,
  SegmentedControl,
  Text,
} from '@components';
import {
  useAppDispatch,
  useAppSelector,
  useDialog,
  useStyledTag,
  useTag,
} from '@hooks';
import {useFocusEffect} from '@react-navigation/native';
import Routes from '@routes';
import {settingsRedux} from '@store';
import {COLORS} from '@theme';
import {ICONS, PERMISSION_TYPE, Permission} from '@utils';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Pressable} from 'react-native';

const HomePage = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const dialog = useDialog();

  const DatePickerArea = useTag(Block);
  const LanguageArea = useTag(Block);

  const DatePickerButton = useStyledTag(AppButton, 'mb-10 p-7');

  const theme = useAppSelector(state => state.settings.theme);

  const [isPermission, setIsPermission] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [dateTimeVisible, setDateTimeVisible] = useState(false);
  const [bottomSheetVisibility, setBottomSheetVisibility] = useState(false);

  const [activeTab, setActiveTab] = useState<number>(0);

  const language = useAppSelector(state => state.settings.language);

  const onChangeLang = (_language: string) => {
    dispatch(settingsRedux.changeLanguage(_language));
  };

  const cameraPermissions = async () => {
    const cameraPermissionsStatus: any = await Permission.checkPermission(
      PERMISSION_TYPE.camera,
    );
    setIsPermission(cameraPermissionsStatus);
  };

  const isSCameraPermissionsCheck = async () => {
    const isCheckPermission: any = await Permission.checkPermission(
      PERMISSION_TYPE.camera,
    );
    setIsPermission(isCheckPermission);
  };

  useFocusEffect(
    useCallback(() => {
      isSCameraPermissionsCheck();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Block row s="pr-20">
          <Text white>language</Text>
          <Text white>:</Text>
          <Text white s="pl-5">
            {language}
          </Text>
        </Block>
      ),
    });
  }, [navigation, language]);

  return (
    <AppScreen scroll>
      <Block center middle mb={20}>
        <AppImage
          resizeMode="contain"
          url={Images.TulparLogo}
          width={200}
          height={60}
        />
      </Block>

      <SegmentedControl
        mt-10
        mb-10
        segments={[
          {label: '1st'},
          {label: '2nd'},
          {label: '3nd'},
          {label: '4nd'},
        ]}
        currentIndex={activeTab}
        setActiveTab={(index: number) => setActiveTab(index)}
      />

      <AppButton
        mb-5
        type="primary"
        title="Bottom Sheet"
        onPress={() => {
          setBottomSheetVisibility(true);
        }}
      />

      <AppButton
        mb-5
        type="primary"
        title={`${theme === 'light' ? 'Dark' : 'Light'} Theme`}
        onPress={() => {
          dispatch(
            settingsRedux.setTheme(theme === 'light' ? 'dark' : 'light'),
          );
        }}
      />

      <DatePickerArea>
        <Row row>
          <Col col-6 pr-2>
            <DatePickerButton
              mr={5}
              title="Date Picker"
              type="primary"
              onPress={() => {
                setDateVisible(true);
              }}
            />
          </Col>
          <Col col-6 pl-2>
            <AppButton
              mr={5}
              title="DateTime Picker"
              type="primary"
              onPress={() => {
                setDateTimeVisible(true);
              }}
            />
          </Col>
        </Row>
      </DatePickerArea>

      <DateTimePicker visible={dateVisible} setVisible={setDateVisible} />
      <DateTimePicker
        mode="datetime"
        visible={dateTimeVisible}
        setVisible={setDateTimeVisible}
      />

      <AppButton
        mb-5
        type="primary"
        title={'Form Example'}
        onPress={() => {
          navigation.navigate(Routes.FORM_SCREEN);
        }}
      />

      <AppButton
        mb={10}
        type="secondary"
        title={'Fetch Data Example'}
        onPress={() => {
          navigation.navigate(Routes.FETCH_DATA_SCREEN);
        }}
      />
      <Row row>
        <Col col-6 pr-2>
          <AppButton
            mt-5
            type="primary"
            title={'Left Alert'}
            onPress={() => {
              dialog.show({
                type: 'warning',
                position: 'left',
                title: 'Camera Permission Warning',
                message: 'You must give permission to take photos',
                action: [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Done'),
                    style: 'cancel',
                  },
                ],
              });
            }}
          />
        </Col>
        <Col col-6 pr-2>
          <AppButton
            mt-5
            type="primary"
            title={'Right Alert'}
            onPress={() => {
              dialog.show({
                type: 'warning',
                position: 'right',
                title: 'Camera Permission Warning',
                message: 'You must give permission to take photos',
                action: [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Done'),
                    style: 'cancel',
                  },
                ],
              });
            }}
          />
        </Col>
      </Row>
      <Row row>
        <Col col-6 pr-2>
          <AppButton
            mt-5
            type="primary"
            title={'Top Alert'}
            onPress={() => {
              dialog.show({
                type: 'warning',
                position: 'top',
                title: 'Camera Permission Warning',
                message: 'You must give permission to take photos',
                action: [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Done'),
                    style: 'cancel',
                  },
                ],
              });
            }}
          />
        </Col>
        <Col col-6 pr-2>
          <AppButton
            mt-5
            type="primary"
            title={'Bottom Alert'}
            onPress={() => {
              dialog.show({
                type: 'warning',
                position: 'bottom',
                title: 'Camera Permission Warning',
                message: 'You must give permission to take photos',
                action: [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Done'),
                    style: 'cancel',
                  },
                ],
              });
            }}
          />
        </Col>
      </Row>

      <LanguageArea mt-5>
        <Row row>
          <Col col-6 pr-2>
            <AppButton
              mb={10}
              type="primary"
              title={'Türkçe'}
              onPress={() => onChangeLang('tr')}
            />
          </Col>
          <Col col-6 pl-2>
            <AppButton
              type="primary"
              title={'İngilizce'}
              onPress={() => onChangeLang('en')}
            />
          </Col>
        </Row>
      </LanguageArea>

      <Block marginTop={20} center middle>
        <AppIcon name={ICONS.camera} size={30} color={COLORS.primary} />
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
      <AppBottomSheet
        isVisible={bottomSheetVisibility}
        onClose={() => setBottomSheetVisibility(false)}>
        <Block h={200}>
          <Text>test</Text>
        </Block>
      </AppBottomSheet>
    </AppScreen>
  );
};

export default HomePage;
