import React, { Component } from 'react';
import { WebView, View, Platform, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { LoadingScreen } from '.';

class PreviewScreen extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.page.AbsoluteURL !== this.props.page.AbsoluteURL;
  }

  _onApprove = () => this.props.navigation.navigate('approve');
  _onReject = () => this.props.navigation.navigate('reject');

  _renderWorkflowButtons = () => {
    if (this.props.page.DocumentChildrenIDs !== undefined) {
      return null;
    }
    return (
      <View style={styles.buttonContainer}>
        {this.props.page.PreviousWorkflowSteps.length !== 0 && 
        <View style={{ flex: 1 }}>
          <Button title='Reject' 
            buttonStyle={{ backgroundColor: '#dc3545', flex: 1 }} 
            onPress={this._onReject}
            containerViewStyle={{ width: '100%', marginLeft: 0, flex: 1 }} 
          />
        </View>}
        {this.props.page.NextWorkflowSteps.length !== 0 &&
        <View style={{ flex: 1 }}>
          <Button title='Approve' 
            buttonStyle={{ backgroundColor: '#497d04', flex: 1 }}
            onPress={this._onApprove} 
            containerViewStyle={{ width: '100%', marginLeft: 0, flex: 1 }}
          />
        </View>}
      </View>
    );
  }

  _renderWorkflowStepName = () => {
    if (this.props.page.DocumentChildrenIDs !== undefined) {
      return null;
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
        <Text>Current workflow step: {this.props.page.CurrentWorkflowStep.WorkflowStepDisplayName}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this._renderWorkflowStepName()}
        <View style={{flex: 10, paddingTop: Platform.OS === 'android' && this.props.page.DocumentChildrenIDs !== undefined ? StatusBar.currentHeight : 0 }}>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: this.props.page.AbsoluteURL }}
            renderLoading={() => <LoadingScreen />}
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
};

const mapStateToProps = state => ({
  page: state.pages.selectedPage,
});

const connectedComponent = connect(mapStateToProps)(PreviewScreen);

export { connectedComponent as PreviewScreen };
