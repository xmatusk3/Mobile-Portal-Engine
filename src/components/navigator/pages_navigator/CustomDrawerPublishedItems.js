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

import { toggleSubItems, selectItem, loadPages } from '../../../actions';

/**
 * Component that renders the navigation list in the drawer.
 */
class CustomDrawerPublishedItems extends Component {
  static defaultProps = {
    activeTintColor: '#2196f3',
    activeBackgroundColor: 'rgba(0, 0, 0, .04)',
    inactiveTintColor: 'rgba(0, 0, 0, .87)',
    inactiveBackgroundColor: 'transparent',
  };

  _toggleSubItems = (page) => {
    if (!page.documentChildrenIDs || page.documentChildrenIDs.length) {
      this.props.loadPages(page.documentID);
    }
    this.props.toggleSubItems(page.documentID);
  }

  _renderSubItems = (page, level) => {
    if (!page.open || !page.documentChildrenIDs) return false;

    return page.documentChildrenIDs.reduce((acc, pageId) => {
      if (this.props.pages[pageId]) {
        const newPageJSX = this._renderItem(this.props.pages[pageId], level);
        acc.push(newPageJSX);
      }
      return acc;
    }, []);
  };

  _onSelectPage = (navigation, page) => {
    this.props.selectItem(page);
    
    navigation.navigate('previewContent');
  }

  _renderDDLToggle = (page, isFocused) => {
    if (!page.documentHasChildren) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => this._toggleSubItems(page)}>
        <View style={[styles.icon, isFocused ? styles.inactiveIcon : null]}>
          {page.open ? (
            <Icon type="entypo" name="circle-with-minus" />
          ) : (
            <Icon type="entypo" name="circle-with-plus" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  _renderItem = (page, level) => {
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
    const label = page.documentName || '/';

    return (
      <View key={page.documentID}>
        <View
          style={{ backgroundColor, marginLeft: 16 * level + (page.documentHasChildren ? 0 : 40) }}
          forceInset={{
            [drawerPosition]: 'always',
            [drawerPosition === 'left' ? 'right' : 'left']: 'never',
            vertical: 'never',
          }}>
          <View style={[styles.item, itemStyle]}>
            {this._renderDDLToggle(page, focused)}
            <TouchableOpacity
              onPress={() => this._onSelectPage(navigation, page)}
              delayPressIn={0}>
              <Text style={[styles.label, { color }, labelStyle]}>{label}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this._renderSubItems(page, level + 1)}
      </View>
    );
  };

  render() {
    const { itemsContainerStyle, pages } = this.props;

    if (!pages || _.isEmpty(pages)) {
      return <ActivityIndicator size="large" style={styles.loaderStyle} />;
    }

    const renderedPages = this._renderItem(
      _.values(pages).find(page => page.documentParentID === 0),
      0
    );

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
  icon: {
    marginLeft: 16,
    width: 24,
    alignItems: 'center',
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    opacity: 0.62,
  },
  loaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({ pages, selectedItem }) => {
  return { pages, selectedItem };
};

const connectedComponent = connect(mapStateToProps, { toggleSubItems, selectItem, loadPages })(
  CustomDrawerPublishedItems
);

export { connectedComponent as CustomDrawerPublishedItems };
