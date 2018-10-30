import React, { Component } from 'react';
import { Picker, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection, Input } from '../common';
import { fetchMetadata, updateMetadata, toggleLoading } from '../../actions';
import { LoadingScreen } from '.';

class MetadataScreen extends Component {
  state = {
    pageTitle: '',
    pageDescription: '',
    pageKeywords: '',
    pageTags: '',
    selectedTagGroup: '',
  };

  componentWillMount() {
    this.props.fetchMetadata();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pageId !== nextProps.pageId) {
      this.props.fetchMetadata();
    }

    if (!nextProps.metadata) return;

    this.setState({
      pageTitle: nextProps.metadata.documentTitle,
      pageDescription: nextProps.metadata.documentDescription,
      pageKeywords: nextProps.metadata.documentKeywords,
      pageTags: nextProps.metadata.documentTags,
      selectedTagGroup: `${Object.keys(nextProps.tagGroups)[0]}`
    });
  }

  _createPickerItems = () => {
    return Object.values(this.props.tagGroups)
      .map(group => 
        <Picker.Item key={group.tagGroupID} label={group.tagGroupDisplayName} value={group.tagGroupID} />
      );
  }

  _onSave = () => {
    this.props.toggleLoading();
    
    this.props.updateMetadata(
      this.state.pageTitle,
      this.state.pageDescription,
      this.state.pageKeywords,
      this.state.selectedTagGroup,
      this.state.pageTags
    );
  }

  render() {
    if (this.props.loading || !this.props.metadata) {
      return <LoadingScreen />;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 10 }}>
          <ScrollView style={styles.containerStyle}>
            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Page settings</Text>
                <Input 
                  label={'Page title:'}
                  placeholder={'Page title'}
                  value={this.state.pageTitle}
                  onChangeText={text => this.setState({ pageTitle: text })}
                  labelCustomStyle={styles.labelStyle}
                  containerCustomStyle={styles.singleRowContainerStyle}
                  inputCustomStyle={styles.singleRowInputStyle}
                />

                <Input 
                  label={'Page description:'}
                  placeholder={'Page description'}
                  value={this.state.pageDescription}
                  multiline
                  onChangeText={text => this.setState({ pageDescription: text })}
                  labelCustomStyle={styles.labelStyle}
                  containerCustomStyle={styles.multipleRowsContainerStyle}
                  inputCustomStyle={styles.multipleRowsInputStyle}
                />

                <Input 
                  label={'Page keywords (separated by comma):'}
                  placeholder={'Cafe, Coffee, ...'}
                  value={this.state.pageKeywords}
                  multiline
                  onChangeText={text => this.setState({ pageKeywords: text })}
                  labelCustomStyle={styles.labelStyle}
                  containerCustomStyle={styles.multipleRowsContainerStyle}
                  inputCustomStyle={styles.multipleRowsInputStyle}
                />
              </CardSection>
            </Card>

            {/* ---------TAGS!-----------*/}

            {this.props.tagGroups && !_.isEmpty(this.props.tagGroups) &&
            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Tags</Text>
                <Text style={styles.normalStyle}>Page tag group:</Text>
                <View style={styles.pickerContainerStyle}>
                  <Picker
                    selectedValue={this.state.selectedTagGroup}
                    style={styles.pickerStyle}
                    onValueChange={itemValue => this.setState({ selectedTagGroup: itemValue })}
                  >
                    {this._createPickerItems()}
                  </Picker>
                </View>

                <Input 
                  label={'Page tags (separated by comma):'}
                  placeholder={'dogs, "angry birds", cats'}
                  value={this.state.pageTags}
                  multiline
                  onChangeText={text => this.setState({ pageTags: text })}
                  labelCustomStyle={styles.labelStyle}
                  containerCustomStyle={styles.multipleRowsContainerStyle}
                  inputCustomStyle={styles.multipleRowsInputStyle}
                />
              </CardSection>
            </Card>
            }
          </ScrollView>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title='Save'
            buttonStyle={styles.buttonStyle}
            onPress={this._onSave}
            containerViewStyle={styles.buttonContainerStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: '#497d04', 
    flex: 1,
  },
  buttonContainerStyle: {
    width: '100%',
    marginLeft: 0, 
    flex: 1
  },
  boldStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#2a2a2a',
  },
  normalStyle: {
    fontSize: 18,
    marginTop: 5,
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ededed',
  },
  sectionStyle: {
    flexDirection: 'column'
  },
  labelStyle: {
    paddingLeft: 0,
    marginTop: 5,
  },
  singleRowInputStyle: {
    marginTop: 5,
    marginLeft: 3,
    height: 40,
    flex: 1,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#bbb'
  },
  singleRowContainerStyle: { 
    height: 40,
    width: '100%'
  },
  multipleRowsContainerStyle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 140,
    marginBottom: 5
  },
  multipleRowsInputStyle: {
    textAlignVertical: 'top',
    height: 100,
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 7,
    borderColor: '#bbb',
    width: '100%',
  },
  pickerStyle: {
    width: '100%',
  },
  pickerContainerStyle: {
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#bbb'
  }
};

const mapStateToProps = ({ selectedItem, auth, global }) => {
  return {
    pageId: selectedItem.documentID,
    metadata: selectedItem.metadata,
    tagGroups: auth.selectedSite.tagGroups,
    loading: global.loading
  };
};

const connectedComponent = connect(mapStateToProps, { fetchMetadata, updateMetadata, toggleLoading })(MetadataScreen);

export { connectedComponent as MetadataScreen };
