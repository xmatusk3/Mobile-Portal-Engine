import React from 'react';
import { View, Text } from 'react-native';         

const NotSupportedField = ({
  label,
  labelCustomStyle,
  containerCustomStyle,
  textCustomStyle,
}) => {
  const { textStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={[containerStyle, containerCustomStyle]}>
      <Text style={[labelStyle, labelCustomStyle]}>{label}</Text>
      <Text style={[textStyle, textCustomStyle]}>This field type is not supported.</Text>
    </View>
  );
};

const styles = {
  labelStyle: {
    paddingLeft: 0,
    marginTop: 5,
    fontSize: 18,
  },
  textStyle: {
    width: '100%',
    textAlign: 'center',
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
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
};

export { NotSupportedField };
