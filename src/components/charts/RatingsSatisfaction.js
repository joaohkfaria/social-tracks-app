import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import OneStar from '../../images/faces/1-star.png';
import TwoStar from '../../images/faces/2-star.png';
import ThreeStar from '../../images/faces/3-star.png';
import FourStar from '../../images/faces/4-star.png';
import FiveStar from '../../images/faces/5-star.png';
import Colors from '../../constants/Colors';

const EmotionImage = styled(Image)`
  width: 150px;
  height: 150px;
  margin-top: 20px;
`;

const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
`;

const Title = styled(Text)`
  font-size: 22px;
  color: ${Colors.white};
  font-weight: 400;
`;

const RatingText = styled(Text)`
  font-size: 18px;
  color: ${Colors.white};
  font-weight: 600;
  margin-top: 20px;
`;

function getRatingImage(rating) {
  if (rating > 4.5) return FiveStar;
  if (rating > 3.5) return FourStar;
  if (rating > 2) return ThreeStar;
  if (rating > 1) return TwoStar;
  if (rating > 0) return OneStar;

  return ThreeStar;
}

const RatingsSatisfaction = ({ rating }) => (
  <Container>
    <EmotionImage source={getRatingImage(rating)} />
    <RatingText>
      {`AVERAGE RATING: ${rating.toFixed(1)}`}
    </RatingText>
  </Container>
);

RatingsSatisfaction.propTypes = {
  rating: PropTypes.number,
};

RatingsSatisfaction.defaultProps = {
  rating: 0,
};

export default RatingsSatisfaction;
