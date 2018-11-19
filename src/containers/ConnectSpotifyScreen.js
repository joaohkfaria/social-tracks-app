import React from 'react';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';
import ConnectFull from '../components/ConnectFull';
import {
  SPOTIFY_REDIRECT_URL, SPOTIFY_CLIENT_ID,
  SPOTIFY_SWAP_URL, SPOTIFY_REFRESH_URL,
  SPOTIFY_SCOPES,
} from '../../config';
import { loginSpotify } from '../services/UsersService';
import { showOkAlert } from '../services/AlertService';

class ConnectSpotifyScreen extends React.Component {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      isLoading: true,
      isLoggedIn: false,
    };
    // Binding functions
    this.handleConnectSpotify = this.handleConnectSpotify.bind(this);
    this.handleIsLoggedIn = this.handleIsLoggedIn.bind(this);
  }

  async componentDidMount() {
    try {
      const spotify = await Spotify.initialize({
        clientID: SPOTIFY_CLIENT_ID,
        redirectURL: SPOTIFY_REDIRECT_URL,
        scopes: SPOTIFY_SCOPES,
        tokenSwapURL: SPOTIFY_SWAP_URL,
        tokenRefreshURL: SPOTIFY_REFRESH_URL,
      });
      if (spotify) this.setState({ isLoggedIn: true });
      else this.setState({ isLoading: false });
    } catch (error) {
      showOkAlert('Spotify', 'Cannot initialize Spotify, please, restart the app and try again');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoggedIn } = this.state;
    // Go to the next page if it's logged in
    if (!prevState.isLoggedIn && isLoggedIn) this.handleIsLoggedIn();
  }

  async handleIsLoggedIn() {
    const { navigation } = this.props;
    try {
      // Sending data to API
      const authData = await Spotify.getAuthAsync();
      console.info('AUTH DATA', authData);
      // If there's no auth data, the user is not logged in
      if (!authData) {
        this.setState({ isLoggedIn: false, isLoading: false });
        return;
      }
      // Loggin with Spotify
      const response = await loginSpotify(authData.accessToken);
      console.info(response);
      // Navigate to Twitter Screen
      navigation.navigate('ConnectMastodon');
    } catch (error) {
      console.info('ERROR LOGIN API', error);
      showOkAlert('Spotify', 'Cannot get authenticate with API, please, try again.');
      this.setState({ isLoggedIn: false, isLoading: false });
    }
  }

  async handleConnectSpotify() {
    // Set that is loading
    this.setState({ isLoading: true });
    try {
      // Login with Spotify
      const isLoggedIn = await Spotify.login();
      // Setting new state
      this.setState({ isLoggedIn });
    } catch (error) {
      console.info('Error logging in with Spotify', error);
      showOkAlert('Spotify', 'Error logging in with Spotify, please, try again');
    }
  }

  render() {
    const { isLoading } = this.state;

    return (
      <ConnectFull
        loading={isLoading}
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
