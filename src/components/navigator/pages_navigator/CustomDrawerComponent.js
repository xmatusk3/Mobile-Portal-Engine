import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { CustomDrawerPublishedItems, CustomDrawerWorkflowItems } from '.';

class CustomDrawerComponent extends Component {
  state = { workflow: false };

  _renderItemList = () => {
    return this.state.workflow ? 
      <CustomDrawerWorkflowItems {...this.props} />
      : <CustomDrawerPublishedItems {...this.props} />;
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ workflow: false })}>
              <Text style={[styles.buttonStyle, {backgroundColor: this.state.workflow ? '#d6d9d6' : 'transparent'}]}>Pages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ workflow: true })}>
              <Text style={[styles.buttonStyle, {backgroundColor: this.state.workflow ? 'transparent' : '#d6d9d6'}]}>Pending pages</Text>
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
