import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { ProgressCircle } from 'react-native-svg-charts';
import Colors from '../../constants/Colors';

const TextContainer = styled(View)`
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ProgressText = styled(Text)`
  font-size: 32px;
  color: ${Colors.white};
  font-weight: 400;
`;

const Progress = ({ value }) => (
  <View style={{ position: 'relative' }}>
    <ProgressCircle
      style={{ height: 150, marginTop: 20, marginBottom: 20 }}
      progress={value}
      progressColor={Colors.default}
    />
    <TextContainer>
      <ProgressText>
        {`${(value * 100).toFixed(1)}`}
      </ProgressText>
    </TextContainer>
  </View>
);

Progress.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Progress;