import React from 'react';
import {AppIcon} from '@components';
import {TouchableOpacity} from 'react-native';

const AppIconButton = ({onPress, icon, style}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <AppIcon {...icon} />
    </TouchableOpacity>
  );
};

export default AppIconButton;
