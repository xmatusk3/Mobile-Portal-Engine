import React from 'react';
import { TextInput, View, Text } from 'react-native';         
import { CheckBox } from 'react-native-elements';  

const Checkbox = ({
  containerCustomStyle,

  checkboxTitle,
  checkboxChecked,
  checkboxOnPress,
  checkboxDisabled,

  extraCheckboxDisabled,
  extraCheckboxChecked,
  extraCheckboxTitle,
  extraCheckboxOnPress,

}) => {
  const { checkboxContainerStyle, containerStyle } = styles;

  return (
    <View style={[containerStyle, containerCustomStyle]}>
      {
        extraCheckboxTitle &&
        <CheckBox 
          title={extraCheckboxTitle} 
          checked={extraCheckboxChecked} 
          onPress={extraCheckboxDisabled ? () => {} : extraCheckboxOnPress}
          containerStyle={checkboxContainerStyle}
        />
      }
      <CheckBox 
        title={checkboxTitle} 
        checked={checkboxChecked} 
        onPress={checkboxDisabled ? () => {} : checkboxOnPress}
        containerStyle={checkboxContainerStyle}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    backgroundColor: 'white',
    width: '100%',
    marginLeft: 5,
    height: 40,
    flex: 1,
  },
  containerStyle: { 
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginTop: 5,
  },
  checkboxContainerStyle: {
    backgroundColor: '#ededed'
  }
};

export { Checkbox };
