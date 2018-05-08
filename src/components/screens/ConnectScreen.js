import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Card, CardSection, Input } from '../common';
import { LoadingScreen } from '.';
import { toggleLoading, setServerAddress, setError, connectToServer } from '../../actions';

class ConnectScreen extends Component {
  _onConnect = () => {
    this.props.setError('');
    if (!this.props.address) {
      this.props.setError('Address field cannot be empty!');
      return;
    }

    this.props.toggleLoading();
    this.props.connectToServer(this.props.address, this.props.navigation.navigate);
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
            <Input
              label={'Address:'}
              placeholder={'127.0.0.1'}
              value={this.props.address}
              onChangeText={text => this.props.setServerAddress(text)}
            />
          </CardSection>

          <Text style={errorTextStyle}>{this.props.error}</Text>

          <CardSection style={buttonCardSectionStyle}>
            <Button title="Connect" buttonStyle={buttonStyle} onPress={this._onConnect} raised />
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

const mapStateToProps = ({ global: { loading, error }, auth: { address } }) => {
  return { loading, error, address };
};

const connectedComponent = connect(mapStateToProps, {
  toggleLoading,
  setServerAddress,
  setError,
  connectToServer,
})(ConnectScreen);

export { connectedComponent as ConnectScreen };
