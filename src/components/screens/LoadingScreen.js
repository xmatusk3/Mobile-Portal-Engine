import React, { Component } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View>
          <Text style={styles.boldStyle}>Kentico</Text>
          <Text style={styles.normalStyle}>Pages</Text>
        </View>
        <ActivityIndicator size="large" style={styles.loaderStyle} />
      </View>
    );
  }
}

const styles = {
  boldStyle: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2a2a2a',
  },
  normalStyle: {
    fontSize: 40,
    textAlign: 'center',
    color: '#2a2a2a',
    marginTop: 10,
    marginBottom: 50,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    backgroundColor: '#ededed',
  },
  loaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
};

export { LoadingScreen };
