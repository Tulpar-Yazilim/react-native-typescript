import React from 'react';
import {StyleSheet} from 'react-native';

import {BaseToast, ErrorToast, InfoToast, SuccessToast, ToastProps} from 'react-native-toast-message';

import {AppIcon, Block} from '@/components';
import {COLORS, FONTS} from '@/theme';

const toastConfig = {
  success: (props: ToastProps) => (
    <SuccessToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={2}
      text2Style={styles.message}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={'checkCircle'} color={COLORS.successText} size={26} />
        </Block>
      )}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={2}
      text2Style={styles.message}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={'close'} color={COLORS.error} size={26} />
        </Block>
      )}
    />
  ),
  warning: (props: ToastProps) => (
    <BaseToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={2}
      text2Style={styles.message}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={'alertTriangle'} color={COLORS.warning} size={26} />
        </Block>
      )}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      text1Style={styles.title}
      text1NumberOfLines={2}
      text2Style={styles.message}
      text2NumberOfLines={2}
      renderLeadingIcon={() => (
        <Block pl-10 middle center>
          <AppIcon name={'info'} color={COLORS.primary} size={26} />
        </Block>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    fontFamily: FONTS.fontFamily,
    paddingTop: 10,
    marginLeft: -15,
  },
  message: {
    fontSize: 12,
    fontFamily: FONTS.fontFamily,
    paddingBottom: 10,
    marginLeft: -15,
  },
});

export default toastConfig;
