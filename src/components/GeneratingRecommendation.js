import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image,
  ScrollView, RefreshControl,
} from 'react-native';
import styled from 'styled-components';
import Title from './Title';
import Colors from '../constants/Colors';
import danceImage from '../images/dance.png';

const Container = styled(View)`
  flex-direction: column;
  align-items: center;
`;

const StyledText = styled(Text)`
  text-align: center;
  color: ${Colors.white};
  font-size: 16px;
  margin-top: 10px;
`;

const StyledImage = styled(Image)`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const GeneratingRecommendation = ({ onRefresh, isRefreshing }) => (
  <ScrollView
    contentContainerStyle={{ backgroundColor: Colors.defaultBackgroundColor }}
    indicatorStyle="white"
    refreshControl={(
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    )}
  >
    <Container>
      <StyledImage source={danceImage} />
      <Title>Hello There!</Title>
      <StyledText>
        We are generating the recommendations for your group right now.
        Wait a few minutes and check this page again.
      </StyledText>
    </Container>
  </ScrollView>
);

GeneratingRecommendation.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

export default GeneratingRecommendation;
