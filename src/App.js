import React from 'react';
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
  initialRouteName: 'ConnectSpotify',
});

const App = () => <RootStack />;

export default App;
