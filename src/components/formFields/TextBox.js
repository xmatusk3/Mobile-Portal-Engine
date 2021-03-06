import React from 'react';
import { TextInput, View, Text } from 'react-native';         
import { CheckBox } from 'react-native-elements';  

const TextBox = ({
  label,
  placeholder,
  value,
  onChangeText,
  labelCustomStyle,
  containerCustomStyle,
  inputCustomStyle,
  disabled,
  checkboxTitle,
  checkboxChecked,
  checkboxOnPress,
  checkboxDisabled
}) => {
  const { checkboxContainerStyle, inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={[containerStyle, containerCustomStyle]}>
      <Text style={[labelStyle, labelCustomStyle]}>{label}</Text>
      {
        checkboxTitle &&
        <CheckBox 
          title={checkboxTitle} 
          checked={checkboxChecked} 
          onPress={checkboxDisabled ? () => {} : checkboxOnPress}
          containerStyle={checkboxContainerStyle}
        />
      }
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        autoCorrect={false}
        style={[inputStyle, disabled && { backgroundColor: '#ededed' }, inputCustomStyle]}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
      />
    </View>
  );
};

const styles = {
  labelStyle: {
    paddingLeft: 0,
    marginTop: 5,
    fontSize: 18,
  },
  inputStyle: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 5,
    marginLeft: 3,
    height: 40,
    flex: 1,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#bbb',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  containerStyle: { 
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5
  },
  checkboxContainerStyle: {
    backgroundColor: '#ededed'
  }
};

export { TextBox };
