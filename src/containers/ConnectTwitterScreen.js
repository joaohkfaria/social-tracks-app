import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

class ConnectTwitterScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Connect Twitter Screen</Text>
        <Button
          title="Connect with Twitter"
          onPress={() => navigation.navigate('GroupsStack')}
        />
      </View>
    );
  }
}

ConnectTwitterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ConnectTwitterScreen;
