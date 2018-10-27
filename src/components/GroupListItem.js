import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const Container = styled(View)`
  width: 100%;
  padding: 15px;
  background-color: ${Colors.darkContrast};
`;

const Title = styled(Text)`
  color: white;
  font-size: 16px;
`;

const Description = styled(Text)`
  color: ${Colors.lightGrey};
  font-size: 13px;
  margin-top: 3px;
`;

const Divider = styled(View)`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const GroupListItem = ({ name, description, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Container>
        <Title>{name}</Title>
        {
          description
          && <Description>{description}</Description>
        }
      </Container>
      <Divider />
    </View>
  </TouchableOpacity>
);

GroupListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onPress: PropTypes.func,
};

GroupListItem.defaultProps = {
  description: null,
  onPress: () => null,
};

export default GroupListItem;
