import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import { toggleSubItems, selectPage } from '../../../actions/index';

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

  _renderItem = (page, level) => {
    const {
      navigation: { navigate },
      activeTintColor,
      inactiveTintColor,
      activeBackgroundColor,
      inactiveBackgroundColor,
      drawerPosition,
      itemStyle,
      labelStyle,
    } = this.props;

    const focused = page.DocumentID === this.props.selectedPage.DocumentID;
    const color = focused ? activeTintColor : inactiveTintColor;
    const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
    const label = page.DocumentNamePath.trimLeft('/');
    console.log('inactive tint', inactiveTintColor);
    console.log('label', labelStyle);

    return (
      <View key={page.DocumentID}>
        <View
          style={{ backgroundColor }}
          forceInset={{
            [drawerPosition]: 'always',
            [drawerPosition === 'left' ? 'right' : 'left']: 'never',
            vertical: 'never',
          }}>
          <View style={[styles.item, itemStyle]}>
            <TouchableOpacity
              onPress={() => {
                this.props.selectPage(page);
                navigate('content');
              }}
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

    if (_.isEmpty(pages)) {
      return <Text style={{textAlign: 'center', color: '#2a2a2a' }}>All pages are approved.</Text>;
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

const mapStateToProps = ({ pages }) => {
  return { pages: pages.notPublishedPages, selectedPage: pages.selectedPage };
};

const connectedComponent = connect(mapStateToProps, { toggleSubItems, selectPage })(
    CustomDrawerWorkflowItems
);

export { connectedComponent as CustomDrawerWorkflowItems };
