import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import HomeTabs from './containers/HomeTabs';
import ConnectSpotifyScreen from './containers/ConnectSpotifyScreen';
import ConnectTwitterScreen from './containers/ConnectTwitterScreen';
import GroupsStack from './containers/GroupsStack';

const RootStack = createSwitchNavigator({
  HomeTabs: HomeTabs,
  ConnectSpotify: ConnectSpotifyScreen,
  ConnectTwitter: ConnectTwitterScreen,
  GroupsStack: GroupsStack,
}, {
  initialRouteName: 'ConnectSpotify',
});

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default App;
