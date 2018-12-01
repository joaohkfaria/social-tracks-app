import React from 'react';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';
import ConnectFull from '../components/ConnectFull';
import {
  SPOTIFY_REDIRECT_URL, SPOTIFY_CLIENT_ID,
  SPOTIFY_SWAP_URL, SPOTIFY_REFRESH_URL,
  SPOTIFY_SCOPES,
} from '../../config';
import { loginSpotify, saveUser, getUser } from '../services/UsersService';
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
    this.goNext = this.goNext.bind(this);
  }

  async componentDidMount() {
    try {
      // Initializing Spotify
      const spotify = await Spotify.isInitializedAsync()
      || await Spotify.initialize({
        clientID: SPOTIFY_CLIENT_ID,
        redirectURL: SPOTIFY_REDIRECT_URL,
        scopes: SPOTIFY_SCOPES,
        tokenSwapURL: SPOTIFY_SWAP_URL,
        tokenRefreshURL: SPOTIFY_REFRESH_URL,
      });
      // Trying to get user from Async Storage
      const user = await getUser();
      // If the user exists and has a Spotify ID, just go next
      if (spotify && user && user.spotify_id) this.goNext();
      else if (spotify) this.setState({ isLoggedIn: true });
      else this.setState({ isLoading: false });
    } catch (error) {
      console.info(error);
      showOkAlert('Spotify', 'Cannot initialize Spotify, please, restart the app and try again');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoggedIn } = this.state;
    // Go to the next page if it's logged in
    if (!prevState.isLoggedIn && isLoggedIn) this.handleIsLoggedIn();
  }

  goNext() {
    const { navigation } = this.props;
    // Navigate to Twitter Screen
    navigation.navigate('ConnectMastodon');
  }

  async handleIsLoggedIn() {
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
      const { user } = response;
      // If there's no user on response, thorw error
      if (!user) throw new Error('No user found');
      // Saving user data
      await saveUser(user);
      // Go next
      this.goNext();
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
