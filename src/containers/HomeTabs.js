import React from 'react'
import { createBottomTabNavigator } from 'react-navigation';
import ListenScreen from './ListenScreen';
import SettingsScreen from './SettingsScreen';
import StatisticsScreen from './StatisticsScreen';

const HomeTabs = createBottomTabNavigator(
  {
    Listen: ListenScreen,
    Statistics: StatisticsScreen,
    Settings: SettingsScreen,
  }
);

export default HomeTabs;
