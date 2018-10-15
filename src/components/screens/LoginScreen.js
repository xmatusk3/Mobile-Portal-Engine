import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Input, Card, CardSection } from '../common';
import { LoadingScreen } from '.';
import { setError, toggleLoading, authorizeToServer } from '../../actions';

class LoginScreen extends Component {
  state = { login: '', password: '' };

  componentWillMount() {
    if (this.props.loading) {
      this.props.toggleLoading();
    }
  }

  _onLogin = () => {
    this.props.setError('');
    if (!this.state.login) {
      this.props.setError('Login field cannot be empty!');
      return;
    }

    this.props.toggleLoading();
    this.props.authorizeToServer(this.state.login, this.state.password, this.props.navigation.navigate);
  };

  _renderLogin = () => {
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
              label={'Login:'}
              placeholder={'user name'}
              value={this.state.login}
              onChangeText={text => this.setState({ login: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={'Password:'}
              placeholder={'password'}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
            />
          </CardSection>

          <Text style={errorTextStyle}>{this.props.error}</Text>

          <CardSection style={buttonCardSectionStyle}>
            <Button title="Login" buttonStyle={buttonStyle} onPress={this._onLogin} raised />
          </CardSection>
        </Card>
      </View>
    );
  };

  render() {
    if (this.props.loading) {
      return <LoadingScreen />;
    }

    return this._renderLogin();
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

const mapStateToProps = ({ global: { loading, error } }) => {
  return { loading, error };
};

const connectedComponent = connect(mapStateToProps, {
  setError,
  toggleLoading,
  authorizeToServer,
})(LoginScreen);

export { connectedComponent as LoginScreen };
