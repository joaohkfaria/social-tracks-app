import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, WebView } from 'react-native';
import queryString from 'query-string';
import ConnectFull from '../components/ConnectFull';
import { showOkAlert } from '../services/AlertService';
import { loginMastodon, getUser, saveUser } from '../services/UsersService';
import Colors from '../constants/Colors';
import { MASTODON_AUTH_URL } from '../../config';

class ConnectMastodonScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      isLoading: true,
      showMastodonAuthorize: false,
    };
    // Binding functions
    this.handleConnectMastodon = this.handleConnectMastodon.bind(this);
    this.finishLoginMastodon = this.finishLoginMastodon.bind(this);
    this.handleChangeUrlWebview = this.handleChangeUrlWebview.bind(this);
    this.goNext = this.goNext.bind(this);
  }

  async componentDidMount() {
    try {
      // Trying to get user from Async Storage
      const user = await getUser();
      // If the user has Mastodon, just go next
      if (user && user.mastodon_id) this.goNext();
      // Set that's not loading, and will show login Mastodon
      else this.setState({ isLoading: false });
    } catch (error) {
      showOkAlert('Mastodon', 'Cannot get data from Mastodon. Please, try again');
    }
  }

  goNext() {
    const { navigation } = this.props;
    navigation.navigate('GroupsStack');
  }

  async handleConnectMastodon() {
    this.setState({ showMastodonAuthorize: true });
  }

  async finishLoginMastodon(authCode) {
    try {
      // Getting current connected user
      const currentUser = await getUser();
      // Connecting with mastodon
      const response = await loginMastodon(authCode, currentUser._id);
      const { user } = response;
      // If there's no user on response, thorw error
      if (!user) throw new Error('No user found');
      // Saving new user
      await saveUser(user);
      // Navigate to Groups Screen
      this.goNext();
    } catch (error) {
      console.info(error);
      showOkAlert('Error', 'Can`t connect with Mastodon. Please, try again.');
      this.setState({ showMastodonAuthorize: false, isLoading: false });
    }
  }

  handleChangeUrlWebview(e) {
    // Getting url
    console.info(e);
    const { url, navigationType } = e;
    // TODO: Better way to get out from authorize
    if (url === 'https://socialtracks.masto.host/oauth/authorize' && navigationType !== 'formsubmit') {
      this.setState({ showMastodonAuthorize: false });
      return;
    }
    // Getting code
    const query = queryString.parse(queryString.extract(url));
    if (query.code) {
      this.finishLoginMastodon(query.code);
      this.setState({ showMastodonAuthorize: false, isLoading: true });
    }
  }

  render() {
    const { isLoading, showMastodonAuthorize } = this.state;

    if (showMastodonAuthorize) {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.defaultBackground }}>
          <WebView
            source={{ uri: MASTODON_AUTH_URL }}
            onNavigationStateChange={this.handleChangeUrlWebview}
          />
        </SafeAreaView>
      );
    }

    return (
      <ConnectFull
        loading={isLoading}
        type="mastodon"
        handleConnect={this.handleConnectMastodon}
      />
    );
  }
}

ConnectMastodonScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ConnectMastodonScreen;
