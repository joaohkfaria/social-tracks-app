import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import DefaultLayout from '../layout/DefaultLayout';
import ListItem from '../components/ListItem';

const settings = [
  {
    id: '1',
    name: 'Change group',
    icon: 'users',
    handleSelect: navigation => navigation.navigate('GroupsStack'),
  },
  {
    id: '2',
    name: 'Logout',
    icon: 'sign-out',
    handleSelect: navigation => navigation.navigate('ConnectSpotify'),
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
