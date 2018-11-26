import React from 'react';
import { Picker } from 'react-native';
import uuid from 'uuid/v4';

import {
  DropDownList, 
  LabelText, 
  TextBox,
  Checkbox,
  RadioButtons
} from '../components/formFields';

export const jsxGenerator = {
  generateLabelText: ({ fieldObject, value, index }) => {
    return (
      <LabelText
        key={index}
        label={`${fieldObject.fieldDisplayName}:`}
        value={`${value}`}
      />
    );
  },

  generateCheckbox: ({ fieldObject, value, onChange, disabled,  isRoot, checkboxValue, onCheckboxChange, checkboxDisabled, index }) => {
    return (
      <Checkbox
        key={index}
        checkboxTitle={fieldObject.fieldDisplayName}
        checkboxChecked={value}
        checkboxOnPress={onChange}
        checkboxDisabled={fieldObject.fieldIsReadOnly || disabled}
        extraCheckboxTitle={fieldObject.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        extraCheckboxChecked={checkboxValue}
        extraCheckboxOnPress={onCheckboxChange}
        extraCheckboxDisabled={checkboxDisabled}
      />
    );
  },

  generateTextbox: ({ fieldObject, value, onChange, disabled,  isRoot, checkboxValue, onCheckboxChange, checkboxDisabled, index }) => {
    return (
      <TextBox
        key={index}
        label={`${fieldObject.fieldDisplayName}:`}
        value={`${value}`}
        onChangeText={text => onChange(text)}
        disabled={fieldObject.fieldIsReadOnly || disabled}
        checkboxDisabled={fieldObject.fieldIsReadOnly || checkboxDisabled}
        checkboxTitle= {fieldObject.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        checkboxChecked={checkboxValue}
        checkboxOnPress={onCheckboxChange}
      />
    )
  },

  generateDropdown: ({ fieldObject, value, onChange, disabled,  isRoot, checkboxValue, onCheckboxChange, checkboxDisabled, index }) => {
    const items = 
      (fieldObject.fieldValue.fieldValue || fieldObject.fieldValue)
        .map(item => 
          <Picker.Item key={item.id} label={item.fieldValue} value={item.id} />
        );
    
    return (
      <DropDownList
        key={index}
        label={`${fieldObject.fieldDisplayName}:`}
        items={items}
        selectedValue={value}
        onValueChange={itemValue => onChange(itemValue) }
        disabled={fieldObject.fieldIsReadOnly || disabled}
        checkboxDisabled={fieldObject.fieldIsReadOnly || checkboxDisabled}
        checkboxTitle={fieldObject.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        checkboxChecked={checkboxValue} 
        checkboxOnPress={onCheckboxChange} 
      />
    );
  },

  generateListing: ({ fieldObject }) => {},

  generateRadioButton: ({ fieldObject, value, onChange, disabled,  isRoot, checkboxValue, onCheckboxChange, checkboxDisabled, index }) => {
    return (
      <RadioButtons
        key={index}
        label={`${fieldObject.fieldDisplayName}:`}
        items={getFieldValue(fieldObject).options}
        selectedIndex={value}
        onChange={onChange}
        disalbed={fieldObject.fieldIsReadOnly || disabled}
        checkboxTitle={fieldObject.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        checkboxChecked={checkboxValue}
        checkboxOnPress={onCheckboxChange}
        checkboxDisabled={fieldObject.fieldIsReadOnly || checkboxDisabled}
      />
    )
  },

  generateTextarea: (field) => {},

  generateNotSupportedField: (field) => {}
};

const getFieldValue = (field) => {
  let value = field;
  while (value && Object.keys(value).indexOf("fieldValue") >= 0) {
    value = value.fieldValue;
  }
  return value;
}
