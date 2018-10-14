import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection, Input } from '../common';
import { rejectPage, approvePage, toggleLoading } from '../../actions';
import { LoadingScreen } from '.';

class WorkflowScreen extends Component {
  state = { comment: '', selectedStep: null };
  isApproveScreen = this.props.isApprove;

  componentWillMount() {
    this._updateSelectedStep(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    this._updateSelectedStep(nextProps.page);
  }

  _updateSelectedStep = ({ nextWorkflowSteps, previousWorkflowSteps }) => {
    if (!nextWorkflowSteps || !previousWorkflowSteps) return;

    this.setState({
      selectedStep: this.isApproveScreen ? nextWorkflowSteps[0] : previousWorkflowSteps[0],
    });
  }

  _onSendAction = () => {
    if (this.isApproveScreen) {
      this.props.toggleLoading();
      this.props.approvePage(
        this.state.selectedStep.workflowStepID,
        this.state.comment,
        this.props.navigation.navigate
      );
    } else {
      this.props.toggleLoading();
      this.props.rejectPage(
        this.state.selectedStep.workflowStepID,
        this.state.comment,
        this.props.navigation.navigate
      );
    }
  };

  _getPickerItems = () => {
    const { nextWorkflowSteps, previousWorkflowSteps } = this.props.page;
    const workflowSteps = this.isApproveScreen ? nextWorkflowSteps : previousWorkflowSteps;

    return workflowSteps.map(step => (
      <Picker.Item key={step.workflowStepID} label={step.workflowStepDisplayName} value={step} />
    ));
  };

  render() {
    if (this.props.page.documentHasChildren !== undefined) {
      return null; 
    }

    if (this.props.loading || _.isEmpty(this.props.page)) {
      return <LoadingScreen />;
    }

    const buttonStyle = this.isApproveScreen
      ? { backgroundColor: '#497d04' }
      : { backgroundColor: '#dc3545' };
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
              placeholder={'Comment...'}
              value={this.state.comment}
              onChangeText={text => this.setState({ comment: text })}
              containerCustomStyle={{ height: '100%', width: '60%' }}
              inputCustomStyle={{ height: '100%', width: '60%' }}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.props.error}</Text>

          <CardSection style={styles.buttonCardSection}>
            <Button
              title={this.isApproveScreen ? 'Approve' : 'Reject'}
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
}

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
    marginLeft: 0,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

const mapStateToProps = ({ global, selectedItem }) => {
  return { page: selectedItem, loading: global.loading, error: global.error };
};

const connectedComponent = connect(mapStateToProps, { rejectPage, approvePage, toggleLoading })(
  WorkflowScreen
);

export { connectedComponent as WorkflowScreen };
