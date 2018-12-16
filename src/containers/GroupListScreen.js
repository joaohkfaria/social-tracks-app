import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../components/PrimaryButton';
import DefaultLayout from '../layout/DefaultLayout';
import ListItem from '../components/ListItem';
import { getGroups } from '../services/GroupsServices';
import NoItemText from '../components/NoItemText';
import ErrorMessage from '../components/ErrorMessage';
import { selectGroup } from '../services/UsersService';

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

class GroupListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      isLoading: true,
      error: false,
    };
    // Binding functions
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
    this.renderGroupItem = this.renderGroupItem.bind(this);
    this.getGroups = this.getGroups.bind(this);

    props.navigation.addListener(
      'willFocus',
      () => this.getGroups(),
    );
  }

  async getGroups() {
    // Setting that we're loading
    this.setState({ isLoading: true });
    try {
      // Getting groups
      const { groups } = await getGroups();
      this.setState({ groups, isLoading: false });
    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.info(error);
    }
  }

  async handleSelectGroup(group) {
    // Get props
    const { navigation } = this.props;
    // Select group
    await selectGroup(group);
    // Navigate to HomeTabs
    navigation.navigate('HomeTabs');
  }

  renderGroupItem(listItem) {
    const { item } = listItem;

    return (
      <ListItem
        onPress={() => this.handleSelectGroup(item)}
        name={item.name}
        description={item.users.map(user => user.name).join(', ')}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { groups, isLoading, error } = this.state;

    if (error) {
      return (
        <DefaultLayout padded>
          <ErrorMessage onRetry={() => this.getGroups()} />
        </DefaultLayout>
      );
    }

    return (
      <DefaultLayout padded>
        <ListContainer>
          {!isLoading && groups.length === 0 && <NoItemText />}
          <FlatList
            data={groups}
            keyExtractor={item => item._id}
            renderItem={this.renderGroupItem}
            style={{ width: '100%', marginTop: 20 }}
            refreshing={isLoading}
            onRefresh={this.getGroups}
          />
        </ListContainer>
        <ActionContainer>
          <PrimaryButton
            title="Create Group"
            onPress={() => navigation.navigate('GroupCreation')}
          />
        </ActionContainer>
      </DefaultLayout>
    );
  }
}

GroupListScreen.navigationOptions = {
  title: 'Select a Group',
};

GroupListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupListScreen;
