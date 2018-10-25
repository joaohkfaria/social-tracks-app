import React from 'react'
import PropTypes from 'prop-types';
import ConnectFull from '../components/ConnectFull';

class ConnectTwitterScreen extends React.Component {
  constructor(props) {
    super(props);
    // Binding functions
    this.handleConnectTwitter = this.handleConnectTwitter.bind(this);
  }

  handleConnectTwitter() {
    // Navigate to Twitter Screen
    const { navigation } = this.props;
    navigation.navigate('GroupsStack');
  }

  render() {
    return (
      <ConnectFull
        type="twitter"
        handleConnect={this.handleConnectTwitter}
      />
    );
  }
}

ConnectTwitterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ConnectTwitterScreen;
