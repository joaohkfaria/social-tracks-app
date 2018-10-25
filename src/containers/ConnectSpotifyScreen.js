import React from 'react';
import PropTypes from 'prop-types';
import ConnectFull from '../components/ConnectFull';

class ConnectSpotifyScreen extends React.Component {
  constructor(props) {
    super(props);
    // Binding functions
    this.handleConnectSpotify = this.handleConnectSpotify.bind(this);
  }

  handleConnectSpotify() {
    // Navigate to Twitter Screen
    const { navigation } = this.props;
    navigation.navigate('ConnectTwitter');
  }

  render() {
    return (
      <ConnectFull
        type="spotify"
        handleConnect={this.handleConnectSpotify}
      />
    );
  }
}

ConnectSpotifyScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ConnectSpotifyScreen;
