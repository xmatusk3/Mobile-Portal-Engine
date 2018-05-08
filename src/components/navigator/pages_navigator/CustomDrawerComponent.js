import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { CustomDrawerPublishedItems, CustomDrawerWorkflowItems } from '.';

class CustomDrawerComponent extends Component {
  state = { published: true };

  _renderItemList = () => {
    return this.state.published ? 
      <CustomDrawerPublishedItems {...this.props} /> 
      : <CustomDrawerWorkflowItems {...this.props} />;
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ published: true })}>
              <Text style={[styles.buttonStyle, {backgroundColor: this.state.published ? 'transparent' : '#d6d9d6'}]}>Published</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ published: false })}>
              <Text style={[styles.buttonStyle, {backgroundColor: this.state.published ? '#d6d9d6' : 'transparent'}]}>Waiting for approval</Text>
            </TouchableOpacity>
          </View>
          {this._renderItemList()}
        </SafeAreaView>
      </ScrollView>
    );
  }
};

const styles = {
  buttonStyle: {
    flex: 1,
    paddingVertical: 17,
    textAlign: 'center',
    color: '#2a2a2a'
  }
}

export { CustomDrawerComponent };
