import React from 'react';
import { View, StatusBar } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import HomeTabs from './containers/HomeTabs';
import ConnectSpotifyScreen from './containers/ConnectSpotifyScreen';
import ConnectTwitterScreen from './containers/ConnectTwitterScreen';
import GroupsStack from './containers/GroupsStack';

const RootStack = createSwitchNavigator({
  HomeTabs,
  ConnectSpotify: ConnectSpotifyScreen,
  ConnectTwitter: ConnectTwitterScreen,
  GroupsStack,
}, {
  initialRouteName: 'HomeTabs',
});

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" />
    <RootStack />
  </View>
);

export default App;
