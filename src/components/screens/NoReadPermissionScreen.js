import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class NoReadPermissionScreen extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <View>
          <Text style={styles.normalStyle}>You do not have permission to view this page.</Text>
        </View>
      </View>
    );
  }
}

const styles = {
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
};

export { NoReadPermissionScreen };
