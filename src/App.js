import React from 'react';
import { View, StatusBar } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import HomeTabs from './containers/HomeTabs';
import ConnectSpotifyScreen from './containers/ConnectSpotifyScreen';
import GroupsStack from './containers/GroupsStack';
import ConnectMastodonScreen from './containers/ConnectMastodonScreen';

const RootStack = createSwitchNavigator({
  HomeTabs,
  ConnectSpotify: ConnectSpotifyScreen,
  ConnectMastodon: ConnectMastodonScreen,
  GroupsStack,
}, {
  initialRouteName: 'ConnectSpotify',
});

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar barStyle="light-content" />
    <RootStack />
  </View>
);

export default App;
