import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled(View)`
  align-items: center;
  justify-content: center;
`;

const NoItemText = () => (
  <Container>
    <Text style={{ color: 'white', fontSize: 15 }}>
      No item available
    </Text>
  </Container>
);

export default NoItemText;
