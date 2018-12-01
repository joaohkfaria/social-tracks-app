import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import PrimaryButton from '../components/PrimaryButton';
import MultiSelectList from '../components/MultiSelectList';
import Input from '../components/Input';
import { getFriends } from '../services/FriendsService';
import { createGroup } from '../services/GroupsServices';
import DefaultLayout from '../layout/DefaultLayout';
import Spinner from '../components/Spinner';
import { showOkAlert } from '../services/AlertService';
import ErrorMessage from '../components/ErrorMessage';

const ButtonContainer = styled(View)`
  align-items: center;
  margin-top: 20px;
`;

class GroupCreationScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      groupName: '',
      selectedFriendIds: [],
      friends: [],
      isGettingFriends: true,
      errorGettingFriends: false,
      isCreatingGroup: false,
    };
  }

  componentDidMount() {
    this.getFriends();
  }

  async getFriends() {
    try {
      // Setting is loading
      this.setState({ isGettingFriends: true });
      // Getting friends
      const { friends } = await getFriends();
      this.setState({ friends, isGettingFriends: false });
    } catch (error) {
      // Setting error
      this.setState({ errorGettingFriends: true, isGettingFriends: false });
    }
  }

  validate() {
    const { groupName, selectedFriendIds } = this.state;

    if (!groupName) {
      showOkAlert('No Group Name', 'Please, fill group name');
      return false;
    }
    if (selectedFriendIds.length === 0) {
      showOkAlert('No friend selected', 'Please, select at least one friend');
      return false;
    }

    return true;
  }

  async handleCreate() {
    try {
      // Validating fields
      if (!this.validate()) return;
      // Setting is loading
      this.setState({ isCreatingGroup: true });
      // Getting props
      const { navigation } = this.props;
      // Getting state
      const { groupName, selectedFriendIds } = this.state;
      // Creating group
      await createGroup(groupName, selectedFriendIds);
      // Navigating to GroupList
      navigation.navigate('GroupList');
    } catch (error) {
      // Setting that is not loading
      this.setState({ isCreatingGroup: false });
      // Showing error message
      showOkAlert('Error Creating', 'Error creating group, please, try again');
    }
  }

  render() {
    const {
      selectedFriendIds, groupName,
      isGettingFriends, isCreatingGroup,
      friends, errorGettingFriends,
    } = this.state;

    if (isGettingFriends || isCreatingGroup) {
      return (
        <DefaultLayout padded>
          <Spinner />
        </DefaultLayout>
      );
    }

    if (errorGettingFriends) {
      return (
        <DefaultLayout padded>
          <ErrorMessage onRetry={() => this.getFriends()} />
        </DefaultLayout>
      );
    }

    return (
      <DefaultLayout padded>
        <View style={{ marginTop: 20 }}>
          <Input
            onChangeText={text => this.setState({ groupName: text })}
            value={groupName}
            placeholder="Ex: Friends"
            label="Group name"
          />
        </View>
        <MultiSelectList
          items={friends}
          selectedItemsIds={selectedFriendIds}
          onChangeSelected={newSelected => this.setState({ selectedFriendIds: newSelected })}
        />
        <ButtonContainer>
          <PrimaryButton
            title="Create"
            onPress={() => this.handleCreate()}
            style={{ width: 200 }}
          />
        </ButtonContainer>
      </DefaultLayout>
    );
  }
}

GroupCreationScreen.navigationOptions = {
  title: 'Create a Group',
};

GroupCreationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default GroupCreationScreen;
