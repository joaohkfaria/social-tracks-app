import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

const GroupCreationScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Group List Screen</Text>
    <Button
      title="Create Group"
      onPress={() => navigation.navigate('GroupList')}
    />
  </View>
);

GroupCreationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupCreationScreen;
