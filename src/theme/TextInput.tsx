import React, {useState} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Text, Block, Icon} from './index';
import colors from '../config/colors';
import {RFValue} from 'react-native-responsive-fontsize';

const TextInput = ({
  name,
  value,
  onChangeText,
  placeholder,
  error,
  errorText,
  password,
  marginTop = 0,
  marginBottom = 0,
  marginRight = 0,
  marginLeft = 0,
  half,
  multiline,
  flex = 0,
  ...otherProps
}) => {
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };
  return (
    <Block
      flex={flex}
      style={{
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginRight: marginRight,
        marginLeft: marginLeft,
        width: half ? '49%' : '100%',
      }}>
      {value.length > 0 && (
        <Text
          style={styles.label}
          color={error ? colors.errorTextColor : 'black'}>
          {placeholder}
        </Text>
      )}
      <Block
        noflex
        style={[
          styles.textInputContainer,
          {
            height: multiline ? 'auto' : 45,
            borderColor: error
              ? colors.errorBorderColor
              : value.length > 0
              ? '#2A2F35'
              : colors.grey,
          },
        ]}>
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.textInput,
            multiline ? styles.multilineTextInput : {height: 45},
          ]}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          placeholderTextColor={'#7E7E7E'}
          secureTextEntry={password && !visible}
          multiline={multiline}
          {...otherProps}
        />
        {password && (
          <TouchableOpacity onPress={handleVisible}>
            <Icon
              type={'feather'}
              name={visible ? 'eye' : 'eye-off'}
              size={20}
              style={{color: colors.font}}
            />
          </TouchableOpacity>
        )}
      </Block>

      {error && (
        <Text style={styles.errorDescription} color={colors.errorTextColor}>
          {errorText}
        </Text>
      )}
    </Block>
  );
};
export default TextInput;

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    zIndex: 0,
    fontSize: RFValue(15, Dimensions.get('window').height),
    fontFamily: 'Nunito-Regular',
    flex: 1,
    paddingRight: 5,
  },
  multilineTextInput: {
    maxHeight: 120,
    paddingTop: 12,
    paddingBottom: 12,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    top: 0,
    zIndex: 1,
    paddingHorizontal: 5,
    fontSize: RFValue(14, Dimensions.get('window').height),
  },
  placeholder: {
    fontSize: RFValue(15, Dimensions.get('window').height),
    fontFamily: 'Nunito-Regular',
  },
  errorDescription: {
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: RFValue(13, Dimensions.get('window').height),
  },
});
