import React from 'react';
import { View, Text } from 'react-native';         

const LabelText = ({
  label,
  value,
  labelCustomStyle,
  containerCustomStyle,
  textCustomStyle,
}) => {
  const { textStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={[containerStyle, containerCustomStyle]}>
      <Text style={[labelStyle, labelCustomStyle]}>{label}</Text>
      <Text style={[textStyle, textCustomStyle]}>{value}</Text>
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
    textAlign: 'left',
    color: '#2a2a2a',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    fontSize: 18,
  },
  containerStyle: { 
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5
  },
};

export { LabelText };
