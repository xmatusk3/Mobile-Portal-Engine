import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { TabNavigator, DrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import _ from 'lodash';

import {
  IntroScreen,
  LoginScreen,
  PreviewScreen,
  ConnectScreen,
  SetSiteScreen,
  WorkflowScreen
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
            approve: { screen: () => <WorkflowScreen isApprove={true} />},
            reject: { screen: () => <WorkflowScreen isApprove={false} />},
          },
          {
            lazy: true,
            swipeEnabled: false,
            navigationOptions: { tabBarVisible: false },
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
