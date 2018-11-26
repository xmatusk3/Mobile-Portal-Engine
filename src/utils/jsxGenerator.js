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
  generateLabelText: (field) => {
    return (
      <LabelText
        key={`${field.fieldDisplayName}${uuid()}`}
        label={`${field.fieldDisplayName}:`}
        value={`${field.fieldValue}`}
      />
    );
  },

  generateCheckbox: (field, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled) => {
    return (
      <Checkbox
        key={`${field.fieldDisplayName}${uuid()}`}
        checkboxTitle={field.fieldDisplayName}
        checkboxChecked={getFieldValue(field)}
        checkboxOnPress={onChange}
        checkboxDisabled={field.fieldIsReadOnly || disabled}
        extraCheckboxTitle={field.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        extraCheckboxChecked={field.fieldValue.checkboxValue}
        extraCheckboxOnPress={onCheckboxChange}
        extraCheckboxDisabled={checkboxDisabled}
      />
    );
  },

  generateTextbox: (field, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled) => {
    return (
      <TextBox
        key={`${field.fieldDisplayName}${uuid()}`}
        label={`${field.fieldDisplayName}:`}
        value={`${getFieldValue(field)}`}
        onChangeText={text => onChange(text)}
        disabled={field.fieldIsReadOnly || disabled}
        checkboxDisabled={field.fieldIsReadOnly || checkboxDisabled}
        checkboxTitle= {field.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        checkboxChecked={field.fieldValue.checkboxValue}
        checkboxOnPress={onCheckboxChange}
      />
    )
  },

  generateDropdown: (field, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled) => {
    const items = 
      (field.fieldValue.fieldValue || field.fieldValue)
        .map(item => 
          <Picker.Item key={item.id} label={item.fieldValue} value={item.id} />
        );
    
    return (
      <DropDownList
        key={`${field.fieldDisplayName}${uuid()}`}
        label={`${field.fieldDisplayName}:`}
        items={items}
        selectedValue={field.fieldSelectedValueID}
        onValueChange={itemValue => onChange(itemValue) }
        disabled={field.fieldIsReadOnly || disabled}
        checkboxDisabled={field.fieldIsReadOnly || checkboxDisabled}
        checkboxTitle={field.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        checkboxChecked={field.fieldValue.checkboxValue} 
        checkboxOnPress={onCheckboxChange} 
      />
    );
  },

  generateListing: (field) => {},

  generateRadioButton: (field, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled) => {
    return (
      <RadioButtons
        key={`${field.fieldDisplayName}${uuid()}`}
        label={`${field.fieldDisplayName}:`}
        items={getFieldValue(field).options}
        selectedIndex={getFieldValue(field).selectedIndex}
        onChange={onChange}
        disalbed={field.fieldIsReadOnly || disabled}
        checkboxTitle={field.fieldValue.checkboxValue !== undefined && !isRoot && 'Inherited'}
        checkboxChecked={field.fieldValue.checkboxValue}
        checkboxOnPress={onCheckboxChange}
        checkboxDisabled={field.fieldIsReadOnly || checkboxDisabled}
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
