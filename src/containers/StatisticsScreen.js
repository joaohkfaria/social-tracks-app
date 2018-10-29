import React from 'react';
import { ScrollView } from 'react-native';
import { ProgressCircle, StackedBarChart } from 'react-native-svg-charts';
import DefaultLayout from '../layout/DefaultLayout';
import Title from '../components/Title';
import Colors from '../constants/Colors';


const data = [
  {
    month: new Date(2015, 0, 1),
    social: 3840,
    expert: 0,
    similarity: 0,
    friendly: 0,
  },
  {
    month: new Date(2015, 1, 1),
    expert: 1600,
    social: 0,
    similarity: 0,
    friendly: 0,
  },
  {
    month: new Date(2015, 2, 1),
    similarity: 3640,
    expert: 0,
    social: 0,
    friendly: 0,
  },
  {
    month: new Date(2015, 3, 1),
    friendly: 3320,
    similarity: 0,
    expert: 0,
    social: 0,
  },
];

const colors = ['#f48e8e', '#ee4444', '#be3636', '#8e2828'];
const keys = ['social', 'expert', 'similarity', 'friendly'];

const StatisticsScreen = () => (
  <DefaultLayout>
    <ScrollView>
      <DefaultLayout padded paddingBar>
        <Title>Your influence in the group</Title>
        <ProgressCircle
          style={{ height: 200, marginTop: 20, marginBottom: 20 }}
          progress={0.7}
          progressColor={Colors.default}
        />

        <Title>You in the group</Title>
        <StackedBarChart
          style={{ height: 200 }}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{ top: 30, bottom: 30 }}
        />
      </DefaultLayout>
    </ScrollView>
  </DefaultLayout>
);

export default StatisticsScreen;
