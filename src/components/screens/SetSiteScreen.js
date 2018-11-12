import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection } from '../common';
import { LoadingScreen } from '.';
import { toggleLoading, setError, selectSiteByName } from '../../actions';

class SetSiteScreen extends Component {
  componentWillMount() {
    if (this.props.loading) {
      this.props.toggleLoading();
    }
  }

  _getPickerItems = () => {
    return _.map(this.props.sites, (site) => (
      <Picker.Item key={site.siteName} label={site.siteDisplayName} value={site.siteName} />
    ));
  };

  _renderConnect = () => {
    const {
      containerStyle,
      errorTextStyle,
      buttonCardSectionStyle,
      boldTextStyle,
      normalTextStyle,
      buttonStyle,
    } = styles;

    return (
      <View style={containerStyle}>
        <View>
          <Text style={boldTextStyle}>Kentico</Text>
          <Text style={normalTextStyle}>Pages</Text>
        </View>

        <Card>
          <CardSection>
            <Text>Select site:</Text>
            <Picker
              selectedValue={this.props.selectedSite.siteName}
              style={{ width: 200 }}
              onValueChange={(itemValue) => { this.props.selectSiteByName(itemValue) } }
            >
              {this._getPickerItems()}
            </Picker>
          </CardSection>

          <Text style={errorTextStyle}>{this.props.error}</Text>

          <CardSection style={buttonCardSectionStyle}>
            <Button
              title="Continue"
              buttonStyle={buttonStyle}
              onPress={() => this.props.navigation.navigate('login')}
              raised
            />
          </CardSection>
        </Card>
      </View>
    );
  };

  render() {
    if (this.props.loading) {
      return <LoadingScreen />;
    }

    return this._renderConnect();
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
  buttonStyle: {
    backgroundColor: '#497d04',
    shadowColor: '#355e00',
    shadowOffset: { height: -3, width: 0 },
  },
  buttonCardSectionStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  boldTextStyle: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2a2a2a',
  },
  normalTextStyle: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2a2a2a',
    marginBottom: 50,
    marginTop: 10,
  },
};

const mapStateToProps = ({ global: { loading, error }, auth: { sites, selectedSite } }) => {
  return { loading, error, sites, selectedSite };
};

const connectedComponent = connect(mapStateToProps, {
  toggleLoading,
  selectSiteByName,
  setError,
})(SetSiteScreen);

export { connectedComponent as SetSiteScreen };
