import React, { Component } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import _ from 'lodash';

class MultipleChoice extends Component {
  state = {
    selectedItems: [],
    items: {},
  };

  componentWillReceiveProps(nextProps) {
    const newItems = _.mapValues(nextProps.items, 
      item => ({
        ...item, 
        checked: nextProps.selectedItems.indexOf(item.title) >= 0 
      })
    );

    this.setState({
      selectedItems: [...nextProps.selectedItems],
      items: newItems
    });
  }

  _onCheckboxPress = (title) => {
    const newSelectedItems = [...this.state.selectedItems];
    const index = newSelectedItems.indexOf(title);

    if (index >= 0) {
      newSelectedItems.splice(index, 1);
    } else {
      newSelectedItems.push(title);
    }

    this.setState({ 
      selectedItems: [...newSelectedItems], 
      items: {
        ...this.state.items, 
        [title]: {
          ...this.state.items[title], 
          checked: !this.state.items[title].checked 
        } 
      }
    });
  }

  _renderChoices = () => 
    Object.values(this.state.items).map(item => 
      <CheckBox 
        key={item.title}
        title={`${item.title}${item.additionalInfo}`} 
        checked={item.checked}
        onPress={() => this._onCheckboxPress(item.title)}
        containerStyle={styles.checkboxContainerStyle}
      />
    )

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.visible}  
        onRequestClose={this.props.onRequestClose}
        transparent={false}
      >
        <View style={styles.multipleChoiceContainer}>
          <ScrollView>
            {this._renderChoices()}
          </ScrollView>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title='Cancel'
            color='#262524'
            buttonStyle={styles.cancelButtonStyle}
            onPress={this.props.onRequestClose}
            containerViewStyle={styles.cancelButtonContainerStyle}
          />
          <Button
            title='Confirm'
            buttonStyle={styles.confirmButtonStyle}
            onPress={() => this.props.onConfirm(this.state.selectedItems)}
            containerViewStyle={styles.confirmButtonContainerStyle}
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  multipleChoiceContainer: {
    flex: 11,
    backgroundColor: '#ededed'
  },
  buttonsContainer: {
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ededed'
  },
  checkboxContainerStyle: {
    backgroundColor: '#e5e5e5',
  },
  cancelButtonStyle: {
    backgroundColor: '#bdbbbb',
    borderWidth: 1,
    flex: 1
  },
  cancelButtonContainerStyle: {
    flex: 1,
    width: '40%',
    height: 50,
  },
  confirmButtonStyle: {
    backgroundColor: '#497d04', 
    borderWidth: 1,
    flex: 1
  },
  confirmButtonContainerStyle: {
    flex: 1,
    width: '40%',
    height: 50,
  }
}

export { MultipleChoice };
