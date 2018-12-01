import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import PrimaryButton from './PrimaryButton';

const Container = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = ({ onRetry }) => (
  <Container>
    <Text style={{ color: 'white', fontSize: 15, marginBottom: 10 }}>Error on loading</Text>
    <PrimaryButton title="Retry" iconName="sync" onPress={onRetry} />
  </Container>
);

ErrorMessage.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

export default ErrorMessage;
