import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  multiline,
  secureTextEntry, 
  containerCustomStyle, 
  inputCustomStyle, 
  labelCustomStyle }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={[containerStyle, containerCustomStyle]}>
      <Text style={[labelStyle, labelCustomStyle]}>{label}</Text>
      <TextInput
        underlineColorAndroid="transparent"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        multiline={multiline}
        autoCorrect={false}
        style={[inputStyle, inputCustomStyle]}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 40,
    width: 200,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export { Input };
