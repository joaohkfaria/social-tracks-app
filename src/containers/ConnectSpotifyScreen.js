import React from 'react';
import PropTypes from 'prop-types';
import ConnectFull from '../components/ConnectFull';

const ConnectSpotifyScreen = ({ navigation }) => {
  function handleConnectSpotify() {
    // Navigate to Twitter Screen
    navigation.navigate('ConnectTwitter');
  }

  return (
    <ConnectFull
      type="spotify"
      handleConnect={handleConnectSpotify}
    />
  );
};

ConnectSpotifyScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ConnectSpotifyScreen;
