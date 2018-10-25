import { createStackNavigator } from 'react-navigation';
import GroupListScreen from './GroupListScreen';
import GroupCreationScreen from './GroupCreationScreen';

const GroupsStack = createStackNavigator({
  GroupList: GroupListScreen,
  GroupCreation: GroupCreationScreen,
});

export default GroupsStack;
