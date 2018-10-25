import React from 'react'
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

class GroupListScreen extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Group List Screen</Text>
        <Button
          title="Select Group"
          onPress={() => navigation.navigate('HomeTabs')}
        />
        <Button
          title="Create Group"
          onPress={() => navigation.navigate('GroupCreation')}
        />
      </View>
    );
  }
}

GroupListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupListScreen;
