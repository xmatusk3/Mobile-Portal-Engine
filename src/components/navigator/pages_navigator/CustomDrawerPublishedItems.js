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
class CustomDrawerPublishedItems extends Component {
  static defaultProps = {
    activeTintColor: '#2196f3',
    activeBackgroundColor: 'rgba(0, 0, 0, .04)',
    inactiveTintColor: 'rgba(0, 0, 0, .87)',
    inactiveBackgroundColor: 'transparent',
  };

  _renderSubItems = (page, level) => {
    if (!page.open || page.DocumentChildrenIDs.length === 0) return false;
    console.log('WTF');

    return page.DocumentChildrenIDs.reduce((acc, pageId) => {
      if (this.props.pages[pageId]) {
        const newPageJSX = this._renderItem(this.props.pages[pageId], level);
        acc.push(newPageJSX);
      }
      return acc;
    }, []);
  };

  _renderDDLToggle = (pageId, subItems, isOpen, isFocused) => {
    if (subItems.length === 0) {
      return null;
    }
    console.log('it is still here:', pageId);

    return (
      <TouchableOpacity onPress={() => this.props.toggleSubItems(pageId)}>
        <View style={[styles.icon, isFocused ? styles.inactiveIcon : null]}>
          {isOpen ? (
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
    const label = page.DocumentName || '/';

    return (
      <View key={page.DocumentID}>
        <View
          style={{ backgroundColor, marginLeft: 16 * level + (page.DocumentChildrenIDs.length === 0 ? 40 : 0) }}
          forceInset={{
            [drawerPosition]: 'always',
            [drawerPosition === 'left' ? 'right' : 'left']: 'never',
            vertical: 'never',
          }}>
          <View style={[styles.item, itemStyle]}>
            {this._renderDDLToggle(page.DocumentID, page.DocumentChildrenIDs, page.open, focused)}
            <TouchableOpacity
              onPress={() => {
                console.log('selectujem pagu:', page);
                this.props.selectPage(page);
                navigate('DrawerClose');
              }}
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
      _.values(pages).find(page => page.DocumentNamePath === '/'),
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

const mapStateToProps = ({ pages }) => {
  return { pages: pages.publishedPages, selectedPage: pages.selectedPage };
};

const connectedComponent = connect(mapStateToProps, { toggleSubItems, selectPage })(
  CustomDrawerPublishedItems
);

export { connectedComponent as CustomDrawerPublishedItems };
