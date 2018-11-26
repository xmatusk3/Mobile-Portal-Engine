import React, { Component } from 'react';
import { Picker, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection } from '../common';
import { TextBox, TextArea, DropDownList, MultipleChoice } from '../formFields';
import { fetchGeneralProperties, updateGeneralPropertiesUI } from '../../actions';
import { LoadingScreen, NoReadPermissionScreen } from '.';
import utils from '../../utils/utils';

const propertiesSectionIdentifiers = {
  DESIGN: 'designGeneralProperties',
  OTHER: 'otherGeneralProperties',
  OWNER: 'ownerGeneralProperties',
  OUTPUT_CACHE: 'outputCacheGeneralProperties',
  ONLINE_MARKETING: 'onlineMarketingGeneralProperties'
}

class GeneralPropertiesScreen extends Component {
  state = {
    serverMessage: '',
    serverMessageIsError: false,
  };

  componentWillMount() {
    this.props.navigation.addListener('willFocus', this.props.fetchGeneralProperties);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('willFocus', this.props.fetchGeneralProperties);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasModifyPermission === false) {
      this.setState({
        serverMessage: 'You cannot modify this page.',
        serverMessageIsError: false
      });
    }
  }

  _renderDesignSection = () => {
    const { designGeneralProperties, updateGeneralPropertiesUI, hasModifyPermission, pageIsNotRoot } = this.props;

    return Object.keys(designGeneralProperties)
      .map(key => {
        const object = designGeneralProperties[key];

        return utils.generateFormField(
          object, 
          (value) => updateGeneralPropertiesUI({ [key]: {...object, fieldSelectedValueID: value} }, propertiesSectionIdentifiers.DESIGN),
          () => updateGeneralPropertiesUI(
            { [key]: { ...object, fieldValue: { ...object.fieldValue, checkboxValue: !object.fieldValue.checkboxValue} }},
             propertiesSectionIdentifiers.DESIGN),
          !pageIsNotRoot,
          !hasModifyPermission || object.fieldValue.checkboxValue,
          !hasModifyPermission
        );
      });
  }

  _renderOtherSection = () => {
    const { otherGeneralProperties, pageIsNotRoot } = this.props;

    return Object.keys(otherGeneralProperties)
      .map(key => {
        let object = otherGeneralProperties[key];

        if (!pageIsNotRoot && object.fieldValue === null) {
          return null;
        }

        if (!pageIsNotRoot && object.fieldValue === '') {
          object = { ...object, fieldValue: '(root)' };
        }

        return utils.generateFormField(object);
      });
  }

  _renderOwnerSection = () => {
    const { ownerGeneralProperties } = this.props;
    // TODO: |remove later| field, fieldName, onChange, onCheckboxChange, isRoot, disabled, checkboxDisabled
    return Object.keys(ownerGeneralProperties)
      .map(key => {
        const object = ownerGeneralProperties[key];

        return utils.generateFormField(object);
      })
  }

  _renderOutputCacheSection = () => {
    const { outputCacheGeneralProperties, updateGeneralPropertiesUI, hasModifyPermission } = this.props;

    return Object.keys(outputCacheGeneralProperties)
      .map(key => {
        const object = outputCacheGeneralProperties[key];
        let disabled = !hasModifyPermission;
        let onChange = (index) => updateGeneralPropertiesUI(
          { [key]: {...object, fieldValue: { ...object.fieldValue, selectedIndex: index} }},
          propertiesSectionIdentifiers.OUTPUT_CACHE);

        if (key === 'cacheMinutes') {
          disabled = !hasModifyPermission || outputCacheGeneralProperties.useOutputCache.fieldValue.selectedIndex !== 0;
          onChange = (value) => updateGeneralPropertiesUI(
            { [key]: {...object, fieldValue: value} },
            propertiesSectionIdentifiers.OUTPUT_CACHE);
        }

        return utils.generateFormField(
          object,
          onChange,
          () => {},
          null,  
          disabled
        );
      })
  }

  _renderOnlineMarketingSection = () => {
    const { onlineMarketingGeneralProperties, updateGeneralPropertiesUI, hasModifyPermission, pageIsNotRoot } = this.props;

    return Object.keys(onlineMarketingGeneralProperties)
      .map(key => {
        const object = onlineMarketingGeneralProperties[key];

        return utils.generateFormField(
          object, 
          () => updateGeneralPropertiesUI(
            { [key]: {...object, fieldValue: { ...object.fieldValue, fieldValue: !object.fieldValue.fieldValue} }},
            propertiesSectionIdentifiers.ONLINE_MARKETING),
          () => updateGeneralPropertiesUI(
            { [key]: { ...object, fieldValue: { ...object.fieldValue, checkboxValue: !object.fieldValue.checkboxValue} }},
            propertiesSectionIdentifiers.ONLINE_MARKETING),
          !pageIsNotRoot,
          !hasModifyPermission || object.fieldValue.checkboxValue,
          !hasModifyPermission
        );
      })
  }

  render() {
    if (this.props.loading) {
      return <LoadingScreen />
    }

    if (this.props.hasReadPermission === undefined) {
      return <NoReadPermissionScreen />
    }

    const { serverMessage, serverMessageIsError, hasReadPermission } = this.props;
    
    return (
      <View style={{flex: 1}}>
      {serverMessage ? 
        <View style={styles.serverMessageContainer}>
          <Text style={serverMessageIsError ? styles.errorText : styles.successText}>
            {serverMessage}
          </Text> 
        </View>
      : null}
        <View style={{ flex: serverMessage ? 9.5 : 10 }}>
          <ScrollView style={styles.containerStyle}>
            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Design</Text>
                {this._renderDesignSection()}
              </CardSection>
            </Card>

            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Other properties</Text>
                {this._renderOtherSection()}
              </CardSection>
            </Card>

            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Owner</Text>
                {this._renderOwnerSection()}
              </CardSection>
            </Card>

            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Output cache</Text>
                {this._renderOutputCacheSection()}
              </CardSection>
            </Card>

            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>On-line marketing</Text>
                {this._renderOnlineMarketingSection()}
              </CardSection>
            </Card>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  selectButtonStyle: {
    backgroundColor: '#bdbbbb',
    flex: 1,
    borderWidth: 1,
  },
  selectButtonContainerStyle: {
    width: 80,
    height: 35,
    marginLeft: 0,
    flex: 1,
  },
  saveButtonStyle: {
    backgroundColor: '#497d04', 
    flex: 1,
  },
  saveButtonContainerStyle: {
    width: '100%',
    marginLeft: 0, 
    flex: 1
  },
  boldStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#2a2a2a',
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ededed',
  },
  sectionStyle: {
    flexDirection: 'column'
  },
  serverMessageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  successText: {
    fontSize: 20,
    alignSelf: 'center',
  }
};

const mapStateToProps = ({ selectedItem, global }) => {
  if (!selectedItem.generalProperties) return { loading: true }

  const { 
    designGeneralProperties, 
    otherGeneralProperties, 
    onlineMarketingGeneralProperties, 
    ownerGeneralProperties, 
    outputCacheGeneralProperties, 
    hasModifyPermission, 
    hasReadPermission
  } = selectedItem.generalProperties;

  return {
    designGeneralProperties, 
    otherGeneralProperties, 
    onlineMarketingGeneralProperties, 
    ownerGeneralProperties, 
    outputCacheGeneralProperties, 
    hasModifyPermission, 
    hasReadPermission,
    loading: global.loading,
    pageIsNotRoot: !!selectedItem.documentName,
  };
};

const connectedComponent = connect(mapStateToProps, { fetchGeneralProperties, updateGeneralPropertiesUI })(GeneralPropertiesScreen);

export { connectedComponent as GeneralPropertiesScreen };
