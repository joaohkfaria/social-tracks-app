import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';

const Container = styled(View)`
  flex-direction: column;
  flex: 1;
  align-items: center;
  margin: 20px 0px;
`;

const PointsText = styled(Text)`
  font-size: ${({ big }) => (big ? '62px' : '42px')};
  color: ${({ big }) => (big ? Colors.spotify : Colors.twitter)};
`;

const Title = styled(Text)`
  font-size: ${({ big }) => (big ? '24px' : '20px')};
  color: ${Colors.white};
`;

const Subtitle = styled(Text)`
  font-size: ${({ big }) => (big ? '18px' : '14px')};
  color: ${Colors.white};
  margin-top: 0px;
  font-weight: 400;
`;

const AboveBelow = styled(Subtitle)`
  margin-top: 3px;
  color: ${({ positive }) => (positive ? Colors.spotify : Colors.default)};
  font-weight: 800;
`;

const InfluencePoints = ({
  big, title,
  value, average,
}) => {
  const positive = (value - average) > 0;

  return (
    <Container>
      <Title big={big}>
        {title}
      </Title>
      <PointsText big={big}>
        {(value * 100).toFixed(1)}
      </PointsText>
      <Subtitle big={big}>
        {`AVERAGE: ${(average * 100).toFixed(1)}`}
      </Subtitle>
      <AboveBelow big={big} positive={positive}>
        {`${positive ? '+' : ''}${((value - average) * 100).toFixed(1)}`}
      </AboveBelow>
    </Container>
  );
};

InfluencePoints.propTypes = {
  big: PropTypes.bool,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  average: PropTypes.number.isRequired,
};

InfluencePoints.defaultProps = {
  big: false,
};

export default InfluencePoints;
