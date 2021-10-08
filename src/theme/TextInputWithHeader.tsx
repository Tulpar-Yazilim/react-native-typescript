import React, {useState, useEffect} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Text, Block, Icon} from './index';
import colors from '../config/colors';
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

  ...otherProps
}) => {
  const [visible, setVisible] = useState(true);
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
              ? colors.errorBorderColor
              : value.length > 0
              ? 'black'
              : '#D8D8D8',
          },
        ]}>
        <RNTextInput
          value={text}
          onChangeText={value => {
            setText(value);
            onChangeText(value);
          }}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          placeholderTextColor={'#707070'}
          secureTextEntry={password && visible}
          {...otherProps}
        />
        {password && (
          <TouchableOpacity onPress={handleVisible}>
            <Icon
              type={'feather'}
              name={visible ? 'eye' : 'eye-off'}
              size={20}
              style={{color: '#242424'}}
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
export default TextInputWithHeader;

const styles = StyleSheet.create({
  textInputContainer: {
    height: 45,
    borderRadius: 6,
    borderBottomWidth: 1,
    zIndex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 45,
    zIndex: 0,
    fontSize: RFValue(16, Dimensions.get('window').height),
    fontFamily: 'Nunito-SemiBold',
    flex: 1,
    paddingRight: 5,
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
    fontSize: RFValue(16, Dimensions.get('window').height),
    fontFamily: 'Nunito-Regular',
  },
  errorDescription: {
    paddingLeft: 15,
    paddingTop: 5,
    fontSize: RFValue(13, Dimensions.get('window').height),
  },
});
