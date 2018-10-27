import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const Container = styled(View)`
  padding: 10px;
`;

const Title = styled(Text)`
  color: white;
  font-size: 16px;
`;

const GroupListItem = ({ name }) => (
  <Container>
    <Title>
      {name}
    </Title>
  </Container>
);

GroupListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GroupListItem;
