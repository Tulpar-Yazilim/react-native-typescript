import {Platform} from 'react-native';

import OneSignal from 'react-native-onesignal';

import {config} from '@/config';

const initializeOnesignal = () => {
  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId(config.ONESIGNAL_APP_ID);
  //END OneSignal Init Code

  if (Platform.OS === 'ios') {
    //Prompt for push on iOS
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.info('OneSignal prompt response:', response);
    });
  }

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
    const notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });
};

export {initializeOnesignal};
