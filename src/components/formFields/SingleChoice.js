import React, { Component } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import _ from 'lodash';

class SingleChoice extends Component {
  state = {
    searchedValue: "",
    items: {},
  };

  componentWillReceiveProps({ items }) {
    this.setState({ items });
  }

  _onSearch = (value) => {
    this.setState({ searchedValue: value });
  }

  _renderChoices = () => {
    const choices = Object.Values(items).filter(item => item.name.startsWith(this.state.searchedValue));

    return choices.map(item => 
        <Text key={item.id} onPress={() => this.props.onSelectItem(item.id)} style={styles.rowTextStyle}>{item.name}</Text>
      )
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.visible}  
        onRequestClose={this.props.onRequestClose}
        transparent={false}
        style={styles.wrapperStyle}
      >
        <View>
          <TextInput
            underlineColorAndroid="transparent"
            placeholder="Search..."
            autoCorrect={false}
            style={inputStyle}
            value={this.state.searchedValue}
            onChangeText={this._onSearch}
          />
        </View>
        <View style={styles.choiceContainerStyle}>
          <ScrollView>
            {this._renderChoices()}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = {
  wrapperStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  choiceContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 5,
    marginLeft: 3,
    height: 40,
    flex: 1,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#bbb',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  },
  rowTextStyle: {
    width: '100%',
    textAlign: 'center',
    height: 30,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    lineHeight: 23,
    textDecorationLine:'underline',
    color: '#05a5d1'
  },
}

export { SingleChoice };
