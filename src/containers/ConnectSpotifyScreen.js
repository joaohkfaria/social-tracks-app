import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

class ConnectSpotifyScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Connect Spotify Screen</Text>
        <Button
          title="Connect with Spotify"
          onPress={() => navigation.navigate('ConnectTwitter')}
        />
      </View>
    );
  }
}

ConnectSpotifyScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ConnectSpotifyScreen;
