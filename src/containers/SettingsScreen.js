import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

const SettingsScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
    <Button
      title="Change Group"
      onPress={() => navigation.navigate('GroupsStack')}
    />
  </View>
);

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
