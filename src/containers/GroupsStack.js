import { createStackNavigator } from 'react-navigation';
import GroupListScreen from './GroupListScreen';
import GroupCreationScreen from './GroupCreationScreen';
import Colors from '../constants/Colors';

const GroupsStack = createStackNavigator({
  GroupList: {
    title: 'Select a Group',
    screen: GroupListScreen,
  },
  GroupCreation: GroupCreationScreen,
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: Colors.default,
      textTransform: 'uppercase',
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      textTransform: 'uppercase',
    },
  },
});

export default GroupsStack;
