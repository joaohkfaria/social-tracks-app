import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import DefaultLayout from '../layout/DefaultLayout';
import ListItem from '../components/ListItem';
import { logout, unselectGroup } from '../services/UsersService';

const settings = [
  {
    id: '1',
    name: 'Change group',
    icon: 'users',
    handleSelect: (navigation) => {
      // Removing selected group
      unselectGroup();
      // Navigating to GroupsStack
      navigation.navigate('GroupsStack');
    },
  },
  {
    id: '2',
    name: 'Logout',
    icon: 'sign-out',
    handleSelect: async (navigation) => {
      // Logout Spotify
      await Spotify.logout();
      // Logout user
      await logout();
      // Going to Spotify
      navigation.navigate('ConnectSpotify');
    },
  },
];

const SettingsScreen = ({ navigation }) => {
  function renderItem(listItem) {
    const { item } = listItem;
    return (
      <ListItem
        iconName={item.icon}
        onPress={() => item.handleSelect(navigation)}
        name={item.name}
        description={item.users}
      />
    );
  }

  return (
    <DefaultLayout paddingBar>
      <FlatList
        data={settings}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{ width: '100%' }}
      />
    </DefaultLayout>
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SettingsScreen;
