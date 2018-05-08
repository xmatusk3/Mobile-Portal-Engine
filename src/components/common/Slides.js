import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  _renderLastSlide = index => {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Onwards!"
          containerViewStyle={styles.buttonContainerStyle}
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
          raised
        />
      );
    }
    return null;
  };
  _renderSlides = () => {
    return this.props.data.map((text, index) => {
      return (
        <View key={index} style={styles.slideStyle}>
          <Text style={styles.textStyle}>{text}</Text>
          {this._renderLastSlide(index)}
        </View>
      );
    });
  };

  render() {
    return (
      <ScrollView horizontal pagingEnabled>
        {this._renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: '#497d04',
    shadowColor: '#355e00',
    shadowOffset: { height: -3, width: 0 },
  },
  buttonContainerStyle: {
    backgroundColor: '#497d04',
    marginTop: 15,
  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    backgroundColor: '#ededed',
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#2a2a2a',
  },
};

export default Slides;
