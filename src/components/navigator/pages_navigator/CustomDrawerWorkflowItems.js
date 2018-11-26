import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { toggleSubItems, selectItem, fetchWorkflowPages } from '../../../actions';

/**
 * Component that renders the navigation list in the drawer.
 */
class CustomDrawerWorkflowItems extends Component {
  static defaultProps = {
    activeTintColor: '#2196f3',
    activeBackgroundColor: 'rgba(0, 0, 0, .04)',
    inactiveTintColor: 'rgba(0, 0, 0, .87)',
    inactiveBackgroundColor: 'transparent',
  };

  state = { isFetching: true }

  componentWillMount() {
    this.props.fetchWorkflowPages(() => this.setState({ isFetching: false }));
  }

  _onSelectPage = (navigation, page) => {
    this.props.selectItem(page);
    
    navigation.navigate('previewContent');
  }

  _renderItem = (page) => {
    const {
      navigation,
      activeTintColor,
      inactiveTintColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      drawerPosition,
      itemStyle,
      labelStyle,
    } = this.props;

    const focused = page.documentID === this.props.selectedItem.documentID;
    const color = focused ? activeTintColor : inactiveTintColor;
    const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
    const label = page.documentName;

    return (
      <View key={page.documentID}>
        <View
          style={{ backgroundColor }}
          forceInset={{
            [drawerPosition]: 'always',
            [drawerPosition === 'left' ? 'right' : 'left']: 'never',
            vertical: 'never',
          }}>
          <View style={[styles.item, itemStyle]}>
            <TouchableOpacity
              onPress={() => this._onSelectPage(navigation, page)}
              delayPressIn={0}>
            <Text style={[styles.label, { color }, labelStyle]}>{label}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { itemsContainerStyle, pages } = this.props;

    if (this.state.isFetching) {
      return <ActivityIndicator size="large" style={styles.loaderStyle} />;
    }

    if (_.isEmpty(pages) && !this.state.isFetching) {
      return <Text style={{textAlign: 'center', color: '#2a2a2a' }}>There are no pages waiting for your approval.</Text>;
    }


    const renderedPages = _.map(pages, page => this._renderItem(page));

    return <View style={[styles.container, itemsContainerStyle]}>{renderedPages}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({ workflows, selectedItem }) => {
  return { pages: workflows, selectedItem };
};

const connectedComponent = connect(mapStateToProps, { toggleSubItems, selectItem, fetchWorkflowPages })(
    CustomDrawerWorkflowItems
);

export { connectedComponent as CustomDrawerWorkflowItems };
