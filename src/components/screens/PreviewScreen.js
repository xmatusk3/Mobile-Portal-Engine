import React, { Component } from 'react';
import { WebView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import _ from 'lodash';

import { LoadingScreen, NoReadPermissionScreen } from '.';

class PreviewScreen extends Component {
  _onApprove = () => this.props.navigation.navigate('approve');
  _onReject = () => this.props.navigation.navigate('reject');

  _renderWorkflowButtons = () => {
    const page = this.props.page;
    if (page.documentHasChildren !== undefined || !page.hasModifyPermission) {
      return null;
    }

    return (
      <View style={styles.buttonContainer}>
        {page.previousWorkflowSteps.length !== 0 && (
          <View style={{ flex: 1 }}>
            <Button
              title="Reject"
              buttonStyle={{ backgroundColor: '#dc3545', flex: 1 }}
              onPress={this._onReject}
              containerViewStyle={{ width: '100%', marginLeft: 0, flex: 1 }}
            />
          </View>
        )}
        {page.nextWorkflowSteps.length !== 0 && (
          <View style={{ flex: 1 }}>
            <Button
              title="Approve"
              buttonStyle={{ backgroundColor: '#497d04', flex: 1 }}
              onPress={this._onApprove}
              containerViewStyle={{ width: '100%', marginLeft: 0, flex: 1 }}
            />
          </View>
        )}
      </View>
    );
  };

  _renderPermissionMessage = () => {
    const page = this.props.page;
    if (page.hasModifyPermission || page.hasModifyPermission === undefined) {
      return null;
    }
    
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>
          You cannot modify this page.
        </Text>
      </View>
    )
  }

  _renderWorkflowStepName = () => {
    const page = this.props.page;
    if (page.documentHasChildren !== undefined) {
      return null;
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>
          Current workflow step: {page.currentWorkflowStep.workflowStepDisplayName}
        </Text>
      </View>
    );
  };

  render() {
    const page = this.props.page;

    if (_.isEmpty(page)) {
      return (
        <View style={styles.noPageSelectedView}>
          <Text style={styles.normalTextStyle}>Please select a page.</Text>
        </View>)
      ;
    }

    if (page.hasReadPermission === false) {
      return <NoReadPermissionScreen />
    }

    return (
      <View style={{ flex: 1 }}>
        {this._renderPermissionMessage()}
        {this._renderWorkflowStepName()}
        <View
          style={{
            flex: 10,
          }}>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: page.previewURL }}
            renderLoading={() => <LoadingScreen />}
            startInLoadingState={true}
          />
        </View>
        {this._renderWorkflowButtons()}
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  noPageSelectedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalTextStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#2a2a2a',
  },
};

const mapStateToProps = ({ selectedItem }) => ({
  page: selectedItem,
});

const connectedComponent = connect(mapStateToProps)(PreviewScreen);

export { connectedComponent as PreviewScreen };
