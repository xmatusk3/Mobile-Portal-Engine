import React, { Component } from 'react';
import { Picker, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection } from '../common';
import { TextBox, TextArea, DropDownList, MultipleChoice } from '../formFields';
import { fetchGeneralProperties } from '../../actions';
import { LoadingScreen, NoReadPermissionScreen } from '.';
import utils from '../../utils/utils';

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
    if (nextProps.properties) {
      Object.values(nextProps.properties)
        .map(propSection => Object.keys(propSection)
          .map(propKey => this._setStateForProp(propSection[propKey], propKey)));
    }
  }

  _setStateForProp = (property, key) => {
    let value = property;
    let stateValue;
    let inheritValue;

    while (value) {
      if (value.fieldSelectedValueID) {
        stateValue = value.fieldSelectedValueID;    
      }

      if (value.checkboxValue !== undefined) {
        inheritValue = value.checkboxValue;
      }

      if (value.id !== undefined) {
        stateValue = value.fieldValue;
      }

      if (value.selectedIndex !== undefined) {
        stateValue = value.selectedIndex;
      }

      if (value.fieldValue === undefined) {
        break;
      }

      value = value.fieldValue;
    }

    stateValue = stateValue !== undefined ? stateValue : value;
    // Check for date value
    if (typeof(stateValue) === "string") {
      stateValue = isNaN(new Date(stateValue)) ? stateValue : new Date(stateValue);
    }

    if (inheritValue !== undefined) {
      this.setState({ [key]: stateValue, [`${key}Inherit`]: inheritValue });
    } else {
      this.setState({ [key]: stateValue });
    }
  }

  _createResetRatingButton = (ratingField) => {
    return (
      <View key={'rating'}>
        {ratingField}
        <Button
          title='Reset rating'
          color='#262524'
          disabled={!this.props.hasModifyPermission}
          buttonStyle={styles.buttonStyle}
          onPress={() => console.log('..press..')}
          containerViewStyle={[styles.buttonContainerStyle, { width: 120 }]}
        />
      </View>
    )
  }

  _createClearOutputCacheButton = (cacheMinutesField) => {
    return (
      <View key={'outputCache'}>
        {cacheMinutesField}
        <Button
          title='Clear output cache'
          color='#262524'
          disabled={!this.props.hasModifyPermission}
          buttonStyle={styles.buttonStyle}
          onPress={() => console.log('..pressCache..')}
          containerViewStyle={[styles.buttonContainerStyle, { width: 160 }]}
        />
      </View>
    );
  }

  _createOwnerButtons = (ownerField) => {
    return (
      <View key={'owner'}>
        {ownerField}
        <View style={styles.ownerButtonContainer}>
          <Button
            title='Select'
            color='#262524'
            disabled={!this.props.hasModifyPermission}
            buttonStyle={styles.buttonStyle}
            onPress={() => console.log('..pressSelectOwner..')}
            containerViewStyle={styles.buttonContainerStyle}
          />
          <Button
            title='Clear'
            color='#262524'
            disabled={!this.props.hasModifyPermission}
            buttonStyle={styles.buttonStyle}
            onPress={() => console.log('..pressClearOwner..')}
            containerViewStyle={styles.buttonContainerStyle}
          />
        </View>
      </View>
    );
  }

  _createOwnedByGroupButton = (ownedByGroupField) => {
    return (
      <View key={'ownedByGroup'}>
        {ownedByGroupField}
        <Button
          title='Change'
          color='#262524'
          disabled={!this.props.hasModifyPermission}
          buttonStyle={styles.buttonStyle}
          onPress={() => console.log('..pressChangeOwnedByGroup..')}
          containerViewStyle={styles.buttonContainerStyle}
        />
      </View>
    );
  }

  _renderDesignSection = () => {
    const { properties: { designGeneralProperties }, hasModifyPermission, pageIsNotRoot } = this.props;

    return Object.keys(designGeneralProperties)
      .map((key, index) => {
        const object = designGeneralProperties[key];

        return utils.generateFormField({
          fieldObject: object, 
          value: this.state[key],
          onChange: (value) => this.setState({ [key]: value }),
          disabled: !hasModifyPermission || this.state[`${key}Inherit`],
          isRoot: !pageIsNotRoot,
          checkboxValue: this.state[`${key}Inherit`],
          onCheckboxChange: () => this.setState({ [`${key}Inherit`]: !this.state[`${key}Inherit`]}),
          checkboxDisabled: !hasModifyPermission,
          index
        });
      });
  }

  _renderOtherSection = () => {
    const { properties: { otherGeneralProperties }, pageIsNotRoot } = this.props;

    return Object.keys(otherGeneralProperties)
      .map((key, index) => {
        let object = otherGeneralProperties[key];

        if (!pageIsNotRoot && object.fieldValue === null) {
          return null;
        }

        if (!pageIsNotRoot && object.fieldValue === '') {
          object = { ...object, fieldValue: '(root)' };
        }

        if (key === 'rating') {
          return this._createResetRatingButton(utils.generateFormField({ fieldObject: object, value: this.state[key], index }));
        }

        return utils.generateFormField({ fieldObject: object, value: this.state[key], index });
      });
  }

  _renderOwnerSection = () => {
    const { properties: { ownerGeneralProperties } } = this.props;

    return Object.keys(ownerGeneralProperties)
      .map((key, index) => {
        const object = ownerGeneralProperties[key];

        if (key === 'owner') {
          return this._createOwnerButtons(utils.generateFormField({ fieldObject: object, value: this.state[key], index }));
        }
        else {
          return this._createOwnedByGroupButton(utils.generateFormField({ fieldObject: object, value: this.state[key], index }));
        }
      });
  }

  _renderOutputCacheSection = () => {
    const { properties: { outputCacheGeneralProperties }, hasModifyPermission } = this.props;

    return Object.keys(outputCacheGeneralProperties)
      .map((key, index) => {
        const object = outputCacheGeneralProperties[key];

        if (key === 'cacheMinutes') {
          return this._createClearOutputCacheButton(utils.generateFormField({
            fieldObject: object,
            value: this.state[key],
            onChange: (value) => this.setState({ [key]: value }),
            disabled: !hasModifyPermission || this.state.useOutputCache !== 0,
            index
          }));
        }

        return utils.generateFormField({
          fieldObject: object,
          value: this.state[key],
          onChange: (value) => this.setState({ [key]: value }),
          disabled: !hasModifyPermission,
          index
        });
      })
  }

  
  _renderOnlineMarketingSection = () => {
    const { properties: { onlineMarketingGeneralProperties }, hasModifyPermission, pageIsNotRoot } = this.props;

    return Object.keys(onlineMarketingGeneralProperties)
      .map((key, index) => {
        const object = onlineMarketingGeneralProperties[key];

        return utils.generateFormField({
          fieldObject: object,
          value: this.state[key],
          onChange: () => this.setState({ [key]: !this.state[key] }),
          disabled: !hasModifyPermission || this.state[`${key}Inherit`],
          isRoot: !pageIsNotRoot,
          checkboxValue: this.state[`${key}Inherit`],
          onCheckboxChange: () => this.setState({ [`${key}Inherit`]: !this.state[`${key}Inherit`] }),
          checkboxDisabled: !hasModifyPermission,
          index
        });
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
  ownerButtonContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    backgroundColor: '#bdbbbb',
    flex: 1,
    borderWidth: 1,
    marginLeft: 5
  },
  buttonContainerStyle: {
    width: 80,
    height: 35,
    marginLeft: 0,
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
    properties: {
      designGeneralProperties, 
      otherGeneralProperties, 
      onlineMarketingGeneralProperties, 
      ownerGeneralProperties, 
      outputCacheGeneralProperties,
    }, 
    hasModifyPermission, 
    hasReadPermission,
    loading: global.loading,
    pageIsNotRoot: !!selectedItem.documentName,
  };
};

const connectedComponent = connect(mapStateToProps, { fetchGeneralProperties })(GeneralPropertiesScreen);

export { connectedComponent as GeneralPropertiesScreen };
