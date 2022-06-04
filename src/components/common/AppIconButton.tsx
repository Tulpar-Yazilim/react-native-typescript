import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import AppIcon from './AppIcon';

const AppIconButton = ({onPress, icon, style}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <AppIcon {...icon} />
    </TouchableOpacity>
  );
};

export default memo(AppIconButton);
