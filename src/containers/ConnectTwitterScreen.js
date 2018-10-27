import React from 'react';
import PropTypes from 'prop-types';
import ConnectFull from '../components/ConnectFull';

const ConnectTwitterScreen = ({ navigation }) => {
  function handleConnectTwitter() {
    // Navigate to Twitter Screen
    navigation.navigate('GroupsStack');
  }

  return (
    <ConnectFull
      type="twitter"
      handleConnect={handleConnectTwitter}
    />
  );
};

ConnectTwitterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ConnectTwitterScreen;
