import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import _ from 'lodash';

import {
  IntroScreen,
  LoginScreen,
  PreviewScreen,
  MetadataScreen,
  ConnectScreen,
  SetSiteScreen,
  WorkflowScreen,
} from './src/components/screens';
import { CustomDrawerComponent } from './src/components/navigator/pages_navigator';
import store from './src/store';

export default class App extends React.Component {
  _pageTreeNavigator = () =>
    DrawerNavigator(
      {
        content: TabNavigator(
          {
            preview: { screen: PreviewScreen },
            metadata: { screen: MetadataScreen },
            approve: { screen: props => <WorkflowScreen isApprove={true} {...props} /> },
            reject: { screen: props => <WorkflowScreen isApprove={false} {...props} /> },
          },
          {
            lazy: true,
            swipeEnabled: false,
            initialRouteName: 'preview',
            tabBarOptions: {
              style: {
                paddingTop:
                  Platform.OS === 'android'
                    ? StatusBar.currentHeight
                    : 0,
              }
            }
          }
        ),
      },
      {
        lazy: true,
        drawerBackgroundColor: '#ededed',
        contentComponent: CustomDrawerComponent,
      }
    );

  _navigator = () => {
    return TabNavigator(
      {
        intro: { screen: IntroScreen },
        connect: { screen: ConnectScreen },
        setSite: { screen: SetSiteScreen },
        login: { screen: LoginScreen },
        main: { screen: this._pageTreeNavigator() },
        placeholder: { screen: MetadataScreen }
      },
      {
        navigationOptions: { tabBarVisible: false },
        swipeEnabled: false,
        initialRouteName: 'connect',
      }
    );
  };

  render() {
    const MainNavigator = this._navigator();
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
