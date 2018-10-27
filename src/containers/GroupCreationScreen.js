import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import PaddedLayout from '../layout/PaddedLayout';
import PrimaryButton from '../components/PrimaryButton';

const GroupCreationScreen = ({ navigation }) => (
  <PaddedLayout>
    <PrimaryButton
      title="Create"
      onPress={() => navigation.navigate('GroupList')}
    />
  </PaddedLayout>
);

GroupCreationScreen.navigationOptions = {
  title: 'Create a Group',
};

GroupCreationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupCreationScreen;
