import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../components/PrimaryButton';
import PaddedLayout from '../layout/PaddedLayout';
import GroupListItem from '../components/GroupListItem';
import Colors from '../constants/Colors';

const ActionContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ListContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const mockGroups = [
  {
    id: '1',
    name: 'Work',
    users: 'John, Leonard, Rose',
  },
  {
    id: '2',
    name: 'School',
    users: 'John, Julie, Richard',
  },
  {
    id: '3',
    name: 'Friends',
    users: 'Rick, Julian, Josie',
  },
];

const GroupListScreen = ({ navigation }) => {
  function renderGroupItem(listItem) {
    const { item } = listItem;

    return (
      <GroupListItem
        onPress={() => navigation.navigate('HomeTabs')}
        name={item.name}
        description={item.users}
      />
    );
  }

  return (
    <PaddedLayout>
      <ListContainer>
        <FlatList
          data={mockGroups}
          keyExtractor={item => item.id}
          renderItem={renderGroupItem}
          style={{ width: '100%', marginTop: 20 }}
        />
      </ListContainer>
      <ActionContainer>
        <PrimaryButton
          title="Create Group"
          onPress={() => navigation.navigate('GroupCreation')}
        />
      </ActionContainer>
    </PaddedLayout>
  );
};

GroupListScreen.navigationOptions = {
  title: 'Select a Group',
};

GroupListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupListScreen;
