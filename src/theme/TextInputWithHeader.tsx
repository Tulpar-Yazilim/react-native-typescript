import React, {useState, useEffect} from 'react';
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

const TextInputWithHeader = ({
  name,
  value,
  onChangeText,
  placeholder = 'Giriniz..',
  error,
  errorText,
  password,
  marginTop = 0,
  half,
  noflex = true,
  header = null,
  multiline = false,
  ...otherProps
}: any) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(value);
  const handleVisible = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    value && setText(value);
  }, [value]);
  return (
    <Block noflex={noflex} style={{marginTop: marginTop}}>
      {header && (
        <Block noflex>
          <Text blackFont size={18}>
            {header}
          </Text>
        </Block>
      )}
      <Block
        noflex
        style={[
          styles.textInputContainer,
          {
            borderColor: error
              ? COLORS.error
              : value.length > 0
              ? COLORS.black
              : COLORS.gray,
          },
        ]}>
        <RNTextInput
          value={value}
          onChangeText={value => {
            setText(value);
            onChangeText(value);
          }}
          style={[
            styles.textInput,
            FONTS.input,
            multiline ? styles.multilineTextInput : {height: SIZES.inputHeight},
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
              size={20}
              style={{color: '#242424'}}
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
export default TextInputWithHeader;

const styles = StyleSheet.create({
  textInputContainer: {
    height: SIZES.inputHeight,
    borderRadius: 6,
    borderBottomWidth: 1,
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
