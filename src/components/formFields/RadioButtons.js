import React from 'react';
import { TextInput, View, Text } from 'react-native';         
import { CheckBox } from 'react-native-elements';  
import RadioGroup  from 'react-native-radio-buttons-group'

const RadioButtons = ({
  containerCustomStyle,
  labelCustomStyle,
  label,
  items,
  selectedIndex,
  onChange,
  disabled,
  checkboxTitle,
  checkboxChecked,
  checkboxOnPress,
  checkboxDisabled,

}) => {
  const { checkboxContainerStyle, containerStyle, labelStyle } = styles;

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
      <RadioGroup
        radioButtons={items.map((item, i) => ({ disabled, label: item, selected: i === selectedIndex }))}
        onPress={data => onChange(data.findIndex(item => item.selected))}
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

export { RadioButtons };
