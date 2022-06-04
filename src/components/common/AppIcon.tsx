import React, {memo} from 'react';
import PropTypes from 'prop-types';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

export const IconTypes = {
  zocial: 'zocial',
  octicon: 'octicon',
  material: 'material',
  materialCommunity: 'materialCommunity',
  ionicon: 'ionicon',
  foundation: 'foundation',
  evilicon: 'evilicon',
  entypo: 'entypo',
  fontAwesome: 'fontAwesome',
  fontAwesome5: 'fontAwesome5',
  simpleLineIcon: 'simpleLineIcon',
  feather: 'feather',
  antdesign: 'antdesign',
  fontisto: 'fontisto',
};
const getIconType = (type: string) => {
  switch (type) {
    case 'zocial':
      return ZocialIcon;
    case 'octicon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'materialCommunity':
      return MaterialCommunityIcon;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'fontAwesome':
      return FAIcon;
    case 'fontAwesome5':
      return FA5Icon;
    case 'simpleLineIcon':
      return SimpleLineIcon;
    case 'feather':
      return FeatherIcon;
    case 'antdesign':
      return AntIcon;
    case 'fontisto':
      return FontistoIcon;
    default:
      return FontistoIcon;
  }
};

const AppIcon = ({
  name = '',
  type = IconTypes.fontAwesome,
  marginBottom = 0,
  style = {},
  ...rest
}) => {
  const IconComponent = getIconType(type);
  return (
    <IconComponent
      name={name}
      style={[{marginBottom: marginBottom}, style]}
      {...rest}
    />
  );
};

AppIcon.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  marginBottom: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

AppIcon.defaultProps = {
  name: '',
  type: IconTypes.fontAwesome,
  marginBottom: 0,
  style: {},
};

export default memo(AppIcon);
