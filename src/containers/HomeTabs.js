import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { observable, action } from 'mobx';
import ListenScreen from './ListenScreen';
import SettingsScreen from './SettingsScreen';
import StatisticsScreen from './StatisticsScreen';
import Colors from '../constants/Colors';
import Icon from '../components/Icon';

const appState = observable({
  recommendations: [],
  ratings: {},
  influenceFactors: null,
  isGeneratingRecommendation: false,
  isLoadingRecommendations: true,
  errorLoadingRecommendations: false,
});


appState.setLoadingRecommendations = action(() => {
  appState.isLoadingRecommendations = true;
  appState.errorLoadingRecommendations = false;
});

appState.setErrorRecommendations = action(() => {
  appState.isLoadingRecommendations = false;
  appState.errorLoadingRecommendations = true;
});

appState.setRecommendations = action((props) => {
  appState.recommendations = props.recommendations;
  appState.ratings = props.ratings;
  appState.influenceFactors = props.influenceFactors;
  appState.isGeneratingRecommendation = props.isGeneratingRecommendation;
  appState.isLoadingRecommendations = false;
  appState.errorLoadingRecommendations = false;
});

appState.setRatings = action((ratings) => {
  appState.ratings = ratings;
});

appState.resetRecommendations = action(() => {
  appState.recommendations = [];
  appState.ratings = {};
  appState.influenceFactors = null;
  appState.isGeneratingRecommendation = false;
  appState.isLoadingRecommendations = true;
  appState.errorLoadingRecommendations = false;
});

const HomeTabs = createBottomTabNavigator(
  {
    Listen: {
      screen: props => <ListenScreen {...props} store={appState} />,
    },
    Stats: {
      screen: props => <StatisticsScreen {...props} store={appState} />,
    },
    Settings: SettingsScreen,
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: (iconProps) => {
        const { routeName } = navigation.state;
        const { focused } = iconProps;
        const icons = {
          Listen: 'play-circle',
          Stats: 'chart-pie',
          Settings: 'sliders-h',
        };

        return (
          <Icon
            name={icons[routeName]}
            color={focused ? Colors.white : 'rgba(255, 255, 255, 0.5)'}
            size={25}
          />
        );
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: Colors.default,
        height: 60,
        paddingBottom: 10,
      },
      labelStyle: {
        color: Colors.white,
      },
    },
  },
);

export default HomeTabs;
