import { fieldTypeEnum } from "./fieldTypeEnum";
import { jsxGenerator } from './jsxGenerator';

export default utils = {
  relativeToAbsoluteUrl: (relativeUrl, absolutePrefix) => relativeUrl.replace("~", absolutePrefix),

  ensureHttpsAddress: (url) => {
    let ensuredUrl = url;

    if (ensuredUrl.startsWith('http') && !ensuredUrl.startsWith('https')) {
      ensuredUrl = ensuredUrl.replace('http', 'https');
    }
  
    if (!ensuredUrl.startsWith('https')) {
      ensuredUrl = `https://${ensuredUrl}`;
    }

    return ensuredUrl;
  },

  // TODO: |remove later| field, fieldName, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled
  generateFormField: (fieldObject, onChange = () => {}, onCheckboxChange = () => {}, isRoot = true, disabled = false, checkboxDisabled = false) => {
    switch (fieldObject.fieldType) {
      case fieldTypeEnum.LABEL_TEXT_FIELD:
        return jsxGenerator.generateLabelText(fieldObject);
      case fieldTypeEnum.CHECKBOX_FIELD:
        return jsxGenerator.generateCheckbox(fieldObject, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled);
      case fieldTypeEnum.TEXTBOX_FIELD:
        return jsxGenerator.generateTextbox(fieldObject, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled);
      case fieldTypeEnum.DROPDOWN_FIELD:
        return jsxGenerator.generateDropdown(fieldObject, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled);
      case fieldTypeEnum.SINGLE_CHOICE_FIELD:
        return jsxGenerator.generateListing(fieldObject);
      case fieldTypeEnum.RADIO_BUTTON_FIELD:
        return jsxGenerator.generateRadioButton(fieldObject, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled);
      case fieldTypeEnum.TEXTAREA_FIELD:
        return jsxGenerator.generateTextarea(fieldObject);
      default:
        return jsxGenerator.generateNotSupportedField()
    }
  }
};
