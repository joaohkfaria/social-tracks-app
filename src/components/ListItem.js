import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors';
import Icon from './Icon';

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

const Col = styled(View)`
  flex-direction: column;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const GroupListItem = ({
  iconName, name,
  description, onPress,
  onLongPress,
}) => (
  <TouchableHighlight
    onPress={onPress}
    onLongPress={onLongPress}
    underlayColor="#fff"
    activeOpacity={0.9}
    style={{ marginBottom: 2 }}
  >
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Container>
        <Row>
          {
            iconName
            && (
              <Col style={{ width: 30 }}>
                <Icon name={iconName} size={18} color={Colors.white} />
              </Col>
            )
          }
          <Col>
            <Title>{name}</Title>
            {
              description
              && <Description>{description}</Description>
            }
          </Col>
        </Row>
      </Container>
    </View>
  </TouchableHighlight>
);

GroupListItem.propTypes = {
  iconName: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

GroupListItem.defaultProps = {
  iconName: null,
  description: null,
  onPress: () => null,
  onLongPress: () => null,
};

export default GroupListItem;
