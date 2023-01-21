import {Images} from '@/assets';
import {
  AppBottomSheet,
  AppButton,
  AppIcon,
  AppImage,
  AppScreen,
  AppSwitch,
  Block,
  Col,
  DateTimePicker,
  FloatingButton,
  Row,
  SegmentedControl,
  Text,
} from '@/components';
import {
  useAppDispatch,
  useAppSelector,
  useDialog,
  useStyledTag,
  useTag,
} from '@/hooks';
import Routes from '@/navigation/Routes';
import {settingsRedux} from '@/store';
import {COLORS} from '@/theme';
import {
  ICONS,
  PERMISSION_TYPE,
  Permission,
  createLocalNotification,
} from '@/utils';
import {useFocusEffect} from '@react-navigation/native';
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
  const [floatMenu, setFloatMenu] = useState<boolean>(false);
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
    <React.Fragment>
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
          currentIndex={activeTab}
          onChange={(index: number) => setActiveTab(index)}
          segments={[
            {label: '1st'},
            {label: '2nd'},
            {label: '3nd'},
            {label: '4nd'},
          ]}
          mt-10
          mb-10
        />

        <AppButton
          mb-5
          type="primary"
          title="Bottom Sheet / Switch / Dark Mode"
          onPress={() => {
            setBottomSheetVisibility(true);
          }}
        />

        <AppButton
          mb-5
          type="primary"
          title="Local Notifications"
          onPress={async () => {
            await createLocalNotification({
              title: 'Time to Live',
              message: `Hi 👋, time: ${new Date()}`,
            });
          }}
        />

        <AppButton
          mb-5
          type="primary"
          title={'Floating Button'}
          onPress={() => {
            setFloatMenu(!floatMenu);
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
          type="secondary"
          title={'Form Example'}
          onPress={() => {
            navigation.navigate(Routes.FORM_SCREEN);
          }}
        />

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

        <Block mt-10 center middle>
          <AppIcon name={ICONS.camera} size={30} color={COLORS.primary} />
        </Block>
        <Block center>
          {isPermission ? (
            <Text black center mt-5>
              camera_permissions
            </Text>
          ) : (
            <Pressable onPress={cameraPermissions}>
              <Text black center>
                permissions
              </Text>
            </Pressable>
          )}
        </Block>
        <AppBottomSheet
          isVisible={bottomSheetVisibility}
          onClose={() => setBottomSheetVisibility(false)}>
          <Block h={200} mt-5 mb-25 px-10>
            <Block row center pt-3>
              <Text black>Dark Theme</Text>
              <Block right flex>
                <AppSwitch
                  value={theme === 'dark'}
                  onChange={() =>
                    dispatch(
                      settingsRedux.setTheme(
                        theme === 'light' ? 'dark' : 'light',
                      ),
                    )
                  }
                />
              </Block>
            </Block>
          </Block>
        </AppBottomSheet>
      </AppScreen>

      <FloatingButton
        isVisible={floatMenu}
        onPress={() => {
          setFloatMenu(!floatMenu);
          dialog.show({
            type: 'success',
            position: 'bottom',
            title: 'Approve',
            message: 'Floating Button show ended successfully',
            action: [
              {
                text: 'Cancel',
                onPress: () => console.log('Done'),
                style: 'cancel',
              },
            ],
          });
        }}
        onClose={() => setFloatMenu(!floatMenu)}
      />
    </React.Fragment>
  );
};

export default HomePage;
