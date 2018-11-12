import React from 'react';
import { View, Text, Picker } from 'react-native';         
import { CheckBox } from 'react-native-elements';  

const DropDownList = ({
  label,
  selectedValue,
  onValueChange,
  disabled,
  items,
  ddlContainerCustomStyle,
  ddlCustomStyle,
  ddlTitleCustomStyle,
  checkboxTitle,
  checkboxChecked,
  checkboxOnPress,
}) => {
  const { 
    ddlWrapperStyle,
    labelStyle, 
    ddlContainerStyle, 
    checkboxContainerStyle, 
  } = styles;

  return (
    <View style={[ddlContainerStyle, ddlContainerCustomStyle]}>
      <Text style={[labelStyle, ddlTitleCustomStyle]}>{label}</Text>
      {
        checkboxTitle &&
        <CheckBox
          title={checkboxTitle} 
          checked={checkboxChecked} 
          onPress={checkboxOnPress}
          containerStyle={checkboxContainerStyle}
        />
      }
      <View style={ddlWrapperStyle}>
        <Picker
          selectedValue={selectedValue}
          style={ddlCustomStyle}
          onValueChange={onValueChange}
          enabled={!disabled}
        >
          {items}
        </Picker>
      </View>
    </View>
  );
};

const styles = {  
  ddlWrapperStyle: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#bbb'
  },
  ddlContainerStyle: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5
  },
  labelStyle: {
    fontSize: 18,
    marginTop: 5,
  },
  checkboxContainerStyle: {
    backgroundColor: '#ededed'
  }
};

export { DropDownList };
