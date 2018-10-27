import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../components/PrimaryButton';
import PaddedLayout from '../layout/PaddedLayout';
import GroupListItem from '../components/GroupListItem';

const ActionContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ListContainer = styled(View)`
  flex: 1;
  flex-direction: column;
`;

const mockGroups = [
  {
    id: '1',
    name: 'Work',
  },
  {
    id: '2',
    name: 'School',
  },
  {
    id: '3',
    name: 'Friends',
  },
];

class GroupListScreen extends React.Component {
  constructor(props) {
    super(props);
    // Binding functions
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
    this.renderGroupItem = this.renderGroupItem.bind(this);
  }

  handleSelectGroup() {
    const { navigation } = this.props;
    navigation.navigate('HomeTabs');
  }

  handleCreateGroup() {
    const { navigation } = this.props;
    navigation.navigate('GroupCreation');
  }

  renderGroupItem({ item }) {
    return (
      <GroupListItem
        name={item.name}
      />
    );
  }

  render() {
    return (
      <PaddedLayout>
        <ListContainer>
          <Text>Group List Screen</Text>
          <FlatList
            data={mockGroups}
            keyExtractor={item => item.id}
            renderItem={this.renderGroupItem}
          />
        </ListContainer>
        <ActionContainer>
          <PrimaryButton
            title="Create Group"
            onPress={this.handleCreateGroup}
          />
        </ActionContainer>
      </PaddedLayout>
    );
  }
}

GroupListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupListScreen;
