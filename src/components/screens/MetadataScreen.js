import React, { Component } from 'react';
import { Picker, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, CardSection } from '../common';
import { TextBox, TextArea, DropDownList, MultipleChoice } from '../formFields';
import { fetchMetadata, updateMetadata, toggleLoading, fetchTags, updateMetadataUI } from '../../actions';
import { LoadingScreen, NoReadPermissionScreen } from '.';

class MetadataScreen extends Component {
  state = {
    tagGroupTags: [],
    serverMessage: '',
    serverMessageIsError: false,
    showTagGroupModal: false,
  };

  componentWillMount() {
    this.props.navigation.addListener('willFocus', this.props.fetchMetadata);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('willFocus', this.props.fetchMetadata);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasModifyPermission === false) {
      this.setState({
        serverMessage: 'You cannot modify this page.',
        serverMessageIsError: false
      });
    }
  }

  _createDdlItems = () => {
    return Object.values(this.props.tagGroups)
      .map(group => 
        <Picker.Item key={group.tagGroupID} label={group.tagGroupDisplayName} value={group.tagGroupID} />
      );
  }

  _getSelectedGroupId = () => this.props.selectedTagGroup.fieldValue 
                                ? this.props.selectedTagGroup.fieldValue.tagGroupID
                                : Object.values(this.props.tagGroups)[0].tagGroupID

  _onSelectTagsPress = () => {
    this.props.fetchTags(this._getSelectedGroupId(), 
      () => { 
        this._onCreateModalData();
        this.setState({ showTagGroupModal: true });
      });
  }

  _onSetNewTags = (newTags) => {
    this.props.updateMetadataUI(this.props.pageId, { documentTags: newTags.join(', ') });
    this.setState({ showTagGroupModal: false });
  }

  _onSaveResponse = (message, isError) => {
    this.setState({ serverMessage: message, serverMessageIsError: isError });
    setTimeout(() => this.setState({ serverMessage: '' }), 5000);
  }

  _onSave = () => {
    this.props.toggleLoading();
    
    this.props.updateMetadata(
      this.props.pageTitle,
      this.props.pageDescription,
      this.props.pageKeywords,
      { checkboxValue: this.props.selectedTagGroup.checkboxValue, fieldValue: this.props.selectedTagGroup.fieldValue ? this.props.selectedTagGroup.fieldValue.tagGroupID : null },
      this.props.pageTags,
      this._onSaveResponse,
    );
  }

  _onCreateModalData = () => 
    {
      
      if (!this.props.tagGroups || !this.props.tagGroups[this._getSelectedGroupId()]) {
        return;
      }

      const res = _.keyBy(
                    _.mapValues(
                      this.props.tagGroups[this._getSelectedGroupId()].tags, 
                      tag => ({title: tag.tagDisplayName, additionalInfo: ` (${tag.tagCount})`})), 
                    item => item.title
                  );

      this.setState({ tagGroupTags: res });
    }

  render() {
    if (this.props.hasReadPermission === false) {
      return <NoReadPermissionScreen />
    }

    if (this.props.loading) {
      return <LoadingScreen />;
    }

    const { pageIsNotRoot, tagGroups, pageTitle, pageDescription, pageKeywords, selectedTagGroup, pageTags, hasModifyPermission } = this.props;
    const { serverMessageIsError, serverMessage } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {serverMessage ? 
        <View style={styles.serverMessageContainer}>
          <Text style={serverMessageIsError ? styles.errorText : styles.successText}>
            {serverMessage}
          </Text> 
        </View>
        : null}
        <MultipleChoice
          visible={this.state.showTagGroupModal}
          onRequestClose={() => this.setState({ showTagGroupModal: false })}
          onConfirm={(newTags) => this._onSetNewTags(newTags)}
          items={this.state.tagGroupTags}
          selectedItems={this.props.pageTags ? this.props.pageTags.split(', ') : []}
        />
        <View style={{ flex: serverMessage ? 9.5 : 10 }}>
          <ScrollView style={styles.containerStyle}>
            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Page settings</Text>
                
                <TextBox 
                  label='Page title:'
                  placeholder='Page title'
                  value={pageTitle.fieldValue}
                  onChangeText={text => this.props.updateMetadataUI(this.props.pageId, { documentTitle: { ...pageTitle, fieldValue: text } })}
                  disabled={!hasModifyPermission || (pageIsNotRoot && pageTitle.checkboxValue)}
                  checkboxDisabled={!hasModifyPermission}
                  checkboxTitle= {pageIsNotRoot && 'Inherited'}
                  checkboxChecked={pageTitle.checkboxValue}
                  checkboxOnPress={() => this.props.updateMetadataUI(this.props.pageId, { documentTitle: { ...pageTitle, checkboxValue: !pageTitle.checkboxValue } })}
                />

                <TextArea 
                  label='Page description:'
                  placeholder='Page description'
                  value={pageDescription.fieldValue}
                  onChangeText={text => this.props.updateMetadataUI(this.props.pageId, { documentDescription: { ...pageDescription, fieldValue: text } })}
                  disabled={!hasModifyPermission || (pageIsNotRoot && pageTitle.checkboxValue)}
                  checkboxDisabled={!hasModifyPermission}
                  checkboxTitle={pageIsNotRoot && 'Inherited'}
                  checkboxChecked={pageDescription.checkboxValue}
                  checkboxOnPress={() => this.props.updateMetadataUI(this.props.pageId, { documentDescription: { ...pageDescription, checkboxValue: !pageDescription.checkboxValue } })}
                />

                <TextArea 
                  label='Page keywords (separated by comma):'
                  placeholder='Cafe, Coffee, ...'
                  value={pageKeywords.fieldValue}
                  onChangeText={text => this.props.updateMetadataUI(this.props.pageId, { documentKeywords: { ...pageKeywords, fieldValue: text } })}
                  disabled={!hasModifyPermission || (pageIsNotRoot && pageTitle.checkboxValue)}
                  checkboxDisabled={!hasModifyPermission}
                  checkboxTitle={pageIsNotRoot && 'Inherited'}
                  checkboxChecked={pageKeywords.checkboxValue} 
                  checkboxOnPress={() => this.props.updateMetadataUI(this.props.pageId, { documentKeywords: { ...pageKeywords, checkboxValue: !pageKeywords.checkboxValue } })}
                />
              </CardSection>
            </Card>

            {/* ---------TAGS!-----------*/}

            {tagGroups && !_.isEmpty(tagGroups) &&
            <Card>
              <CardSection style={styles.sectionStyle}>
                <Text style={styles.boldStyle}>Tags</Text>
                <DropDownList 
                  label='Page tag group:'
                  items={this._createDdlItems()}
                  selectedValue={selectedTagGroup.fieldValue ? selectedTagGroup.fieldValue.tagGroupID : Object.values(this.props.tagGroups)[0].tagGroupID}
                  onValueChange={itemValue => this.props.updateMetadataUI(this.props.pageId, { documentTagGroupID: { checkboxValue: selectedTagGroup.checkboxValue, fieldValue: itemValue } }) }
                  disabled={!hasModifyPermission || (pageIsNotRoot && pageTitle.checkboxValue)}
                  checkboxDisabled={!hasModifyPermission}
                  checkboxTitle={pageIsNotRoot && 'Inherited'}
                  checkboxChecked={selectedTagGroup.checkboxValue} 
                  checkboxOnPress={() => this.props.updateMetadataUI(this.props.pageId, { documentTagGroupID: { checkboxValue: !selectedTagGroup.checkboxValue, fieldValue: selectedTagGroup.tagGroupID } }) } 
                />

                <TextBox 
                  label='Page tags (separated by comma):'
                  placeholder='dogs, "angry birds", cats'
                  disabled={!hasModifyPermission}
                  value={pageTags}
                  onChangeText={text => this.props.updateMetadataUI(this.props.pageId, { documentTags: text })}
                />
                <Button
                  title='Select'
                  color='#262524'
                  disabled={!hasModifyPermission}
                  buttonStyle={styles.selectButtonStyle}
                  onPress={() => this._onSelectTagsPress()}
                  containerViewStyle={styles.selectButtonContainerStyle}
                />
              </CardSection>
            </Card>
            }
          </ScrollView>
        </View>
        {hasModifyPermission &&
          <View style={{ flex: 1 }}>
            <Button
              title='Save'
              buttonStyle={styles.saveButtonStyle}
              onPress={this._onSave}
              containerViewStyle={styles.saveButtonContainerStyle}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = {
  selectButtonStyle: {
    backgroundColor: '#bdbbbb',
    flex: 1,
    borderWidth: 1,
  },
  selectButtonContainerStyle: {
    width: 80,
    height: 35,
    marginLeft: 0,
    flex: 1,
  },
  saveButtonStyle: {
    backgroundColor: '#497d04', 
    flex: 1,
  },
  saveButtonContainerStyle: {
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
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ededed',
  },
  sectionStyle: {
    flexDirection: 'column'
  },
  serverMessageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  successText: {
    fontSize: 20,
    alignSelf: 'center',
  }
};

const mapStateToProps = ({ selectedItem, auth, global }) => {
  if (!selectedItem.metadata) return { loading: true }

  const { documentTitle, documentDescription, documentKeywords, documentTags, documentTagGroupID, hasModifyPermission } = selectedItem.metadata;
  return {
    pageIsNotRoot: !!selectedItem.documentName,
    pageId: selectedItem.documentID,
    pageTitle: documentTitle,
    pageDescription: documentDescription,
    pageKeywords: documentKeywords,
    pageTags: documentTags,
    selectedTagGroup: { checkboxValue: documentTagGroupID.checkboxValue, fieldValue: auth.selectedSite.tagGroups[documentTagGroupID.fieldValue] },
    tagGroups: auth.selectedSite.tagGroups,
    hasReadPermission: selectedItem.hasReadPermission,
    hasModifyPermission,
    loading: global.loading,
  };
};

const connectedComponent = connect(mapStateToProps, { fetchMetadata, updateMetadata, toggleLoading, fetchTags, updateMetadataUI })(MetadataScreen);

export { connectedComponent as MetadataScreen };
