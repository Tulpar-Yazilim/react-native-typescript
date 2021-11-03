import React, {useState} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Text from './Text';
import Block from './Block';
import {SIZES, COLORS, FONTS} from './Config';
import AppIcon from '../components/common/AppIcon';
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
}: any) => {
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
        <Text style={styles.label} color={error ? COLORS.error : 'black'}>
          {placeholder}
        </Text>
      )}
      <Block
        noflex
        style={[
          styles.textInputContainer,
          {
            height: multiline ? 'auto' : SIZES.inputHeight,
            borderColor: error
              ? COLORS.error
              : value.length > 0
              ? '#2A2F35'
              : COLORS.gray,
          },
        ]}>
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.textInput,
            FONTS.input,
            multiline && styles.multilineTextInput,
          ]}
          placeholder={placeholder}
          placeholderStyle={[styles.placeholder, FONTS.placeholder]}
          placeholderTextColor={COLORS.placeholder}
          secureTextEntry={password && !visible}
          multiline={multiline}
          {...otherProps}
        />
        {password && (
          <TouchableOpacity onPress={handleVisible}>
            <AppIcon
              type={'feather'}
              name={visible ? 'eye' : 'eye-off'}
              size={SIZES.iconSize}
              style={{color: COLORS.font}}
            />
          </TouchableOpacity>
        )}
      </Block>

      {error && (
        <Text style={styles.errorDescription} color={COLORS.error}>
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
    height: SIZES.inputHeight,
    zIndex: 0,
    fontSize: RFValue(SIZES.inputText, Dimensions.get('window').height),
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
    fontSize: RFValue(SIZES.inputLabel, Dimensions.get('window').height),
  },
  placeholder: {
    fontSize: RFValue(SIZES.inputText, Dimensions.get('window').height),
  },
  errorDescription: {
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: RFValue(SIZES.inputError, Dimensions.get('window').height),
  },
});
