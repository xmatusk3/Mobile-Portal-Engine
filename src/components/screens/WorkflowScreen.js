import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { Card, CardSection, Input } from '../common';

class WorkflowScreen extends Component {
  state = { comment: '', selectedStep: null };
  isApproveScreen = this.props.isApprove;

  componentWillMount() { 
    const { NextWorkflowSteps, PreviousWorkflowSteps } = this.props.page;
    this.setState({ selectedStep: this.isApproveScreen ? NextWorkflowSteps[0] : PreviousWorkflowSteps[0] });
  }

  _onSendAction = () => {
    if (this.isApproveScreen) {
      console.log('APPROVED!');
    } else {
      console.log('REJECTED!')
    }
  }

  _getPickerItems = () => {
    const { NextWorkflowSteps, PreviousWorkflowSteps } = this.props.page;
    const workflowSteps = this.isApproveScreen ? NextWorkflowSteps : PreviousWorkflowSteps;
    
    return workflowSteps.map(step => (
      <Picker.Item key={step.WorkflowStepID} label={step.WorkflowStepDisplayName} value={step} />
    )); 
  };

  render() {
    const buttonStyle = this.isApproveScreen ? { backgroundColor: '#497d04' } : { backgroundColor: '#dc3545' };
    return (
      <View style={styles.containerStyle}>
        <Card>
          <CardSection>
            <Text>Select workflow step:</Text>
            <Picker
              selectedValue={this.state.selectedStep}
              style={{ width: '60%' }}
              onValueChange={itemValue => this.setState({ selectedStep: itemValue })}>
              {this._getPickerItems()}
            </Picker>
          </CardSection>

          <CardSection>
            <Input 
              label={'Comment:'}
              placeholder={'Workflow comment...'}
              value={this.state.comment}
              onChangeText={text => this.setState({ comment: text })}
              containerCustomStyle={{ height: '100%', width: '60%' }}
              inputCustomStyle={{ height: '100%', width: '60%' }}
            />
          </CardSection>

          <CardSection style={styles.buttonCardSection}>
            <Button 
              title={this.isApproveScreen ? "Approve" : "Reject"} 
              buttonStyle={buttonStyle}
              containerViewStyle={styles.buttonContainer}
              onPress={this._onSendAction} 
              raised 
            />
          </CardSection>
        </Card>
      </View>
    );
  }
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
  buttonCardSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginLeft: 0
  },
}

const mapStateToProps = ({ pages }) => {
  return { page: pages.selectedPage };
};

const connectedComponent = connect(mapStateToProps)(WorkflowScreen);

export { connectedComponent as WorkflowScreen };