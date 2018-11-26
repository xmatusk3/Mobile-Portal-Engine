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

  generateFormField: (args = { 
    fieldObject, 
    value, 
    onChange: () => {}, 
    disabled: false, 
    isRoot: true, 
    checkboxValue: false, 
    onCheckboxChange: () => {}, 
    checkboxDisabled: false,
    index
  }) => {
    switch (args.fieldObject.fieldType) {
      case fieldTypeEnum.LABEL_TEXT_FIELD:
        return jsxGenerator.generateLabelText(args);
      case fieldTypeEnum.CHECKBOX_FIELD:
        return jsxGenerator.generateCheckbox(args);
      case fieldTypeEnum.TEXTBOX_FIELD:
        return jsxGenerator.generateTextbox(args);
      case fieldTypeEnum.DROPDOWN_FIELD:
        return jsxGenerator.generateDropdown(args);
      case fieldTypeEnum.SINGLE_CHOICE_FIELD:
        return jsxGenerator.generateListing(args);
      case fieldTypeEnum.RADIO_BUTTON_FIELD:
        return jsxGenerator.generateRadioButton(args);
      case fieldTypeEnum.TEXTAREA_FIELD:
        return jsxGenerator.generateTextarea(args);
      default:
        return jsxGenerator.generateNotSupportedField()
    }
  }
};
