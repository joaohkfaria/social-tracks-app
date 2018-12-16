import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import DefaultLayout from '../layout/DefaultLayout';
import GeneratingRecommendation from '../components/GeneratingRecommendation';
import { getUser } from '../services/UsersService';
import InfluencePoints from '../components/charts/InfluencePoints';
import RatingsSatisfaction from '../components/charts/RatingsSatisfaction';
import Divider from '../components/Divider';

@observer
class StatisticsScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    // Setting user
    const user = await getUser();
    this.setState({ user });
  }

  getAverageByKey(factor = {}, isIncreasedBy1 = false) {
    const keys = Object.keys(factor);
    const numItems = keys.length;
    if (numItems === 0) return 0;
    // Getting total
    const total = keys.reduce(
      (acc, key) => acc + (isIncreasedBy1 ? factor[key] - 1 : factor[key]),
      0,
    );
    // Return medium
    return (total / numItems);
  }

  render() {
    // Getting props
    const { store } = this.props;
    // Getting from mobx store
    const {
      ratings, isGeneratingRecommendation,
      influenceFactors, isLoadingRecommendations,
    } = store;
    // Getting state
    const { user } = this.state;

    // Case is not loaded yet
    if (isGeneratingRecommendation || !influenceFactors || !user) {
      return (
        <DefaultLayout padded paddingBar>
          <GeneratingRecommendation
            onRefresh={() => null}
            isRefreshing={isLoadingRecommendations}
          />
        </DefaultLayout>
      );
    }
    // Getting influence current user
    const similarity = influenceFactors.similarities[user._id];
    const similarityAverage = this.getAverageByKey(influenceFactors.similarities);
    const expert = influenceFactors.expert[user._id];
    const expertAverage = this.getAverageByKey(influenceFactors.expert);
    const friendly = influenceFactors.friendly[user._id];
    const friendlyAverage = this.getAverageByKey(influenceFactors.friendly);
    const leadership = influenceFactors.leadership[user._id];
    const leadershipAverage = this.getAverageByKey(influenceFactors.leadership);
    const influence = influenceFactors.final[user._id];
    const influenceAverage = this.getAverageByKey(influenceFactors.final, true);

    return (
      <DefaultLayout>
        <ScrollView>
          <DefaultLayout padded>
            <RatingsSatisfaction rating={this.getAverageByKey(ratings)} />
            <Divider />
            <InfluencePoints
              big
              title="Influence"
              value={influence - 1}
              average={influenceAverage}
            />
            <InfluencePoints
              title="Similarity Factor"
              value={similarity}
              average={similarityAverage}
            />
            <InfluencePoints
              title="Expert Factor"
              value={expert}
              average={expertAverage}
            />
            <InfluencePoints
              title="Friendly Factor"
              value={friendly}
              average={friendlyAverage}
            />
            <InfluencePoints
              title="Leadership Factor"
              value={leadership}
              average={leadershipAverage}
            />
          </DefaultLayout>
        </ScrollView>
      </DefaultLayout>
    );
  }
}

StatisticsScreen.propTypes = {
  store: PropTypes.object.isRequired,
};

export default StatisticsScreen;
