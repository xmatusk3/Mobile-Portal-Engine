import React, { Component } from 'react';
import _ from 'lodash';

import { View, Text, AsyncStorage } from 'react-native';

import Slides from '../common/Slides';
import { LoadingScreen } from '.';

const SLIDES_TEXT = [
  'Welcome to Kentico Pages!',
  'Use this to edit your site content',
  'Swipe from the left to access specific page and start customizing',
  'But first enter your Kentico configuration to access your server!',
];

class IntroScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('kentico_complete_intro');

    if (token) {
      this.props.navigation.navigate('connect');
    } else {
      this.setState({ token: false });
    }
  }

  _onSlideComplete = () => {
    this.props.navigation.navigate('connect');
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <LoadingScreen />;
    }

    return (
      <View style={{ flex: 1 }}>
        <Slides data={SLIDES_TEXT} onComplete={this._onSlideComplete} />
      </View>
    );
  }
}

export { IntroScreen };
