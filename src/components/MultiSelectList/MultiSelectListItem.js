import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text,
  TouchableOpacity, Image,
} from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Icon from '../Icon';
import Divider from '../Divider';

const Name = styled(Text)`
  font-size: 20px;
  color: ${Colors.white};
  flex: 1;
`;

const Container = styled(View)`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.darkContrast};
`;

const Avatar = styled(Image)`
  border-radius: 25px;
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

const MultiSelectListItem = ({
  id, name,
  selected, onSelect,
  avatar,
}) => (
  <TouchableOpacity
    onPress={() => onSelect(id)}
    activeOpacity={0.7}
  >
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Container>
        {
          avatar && <Avatar source={{ uri: avatar }} />
        }
        <Name>
          {name}
        </Name>
        {
          selected && <Icon name="check" color={Colors.white} size={20} />
        }
      </Container>
      <Divider />
    </View>
  </TouchableOpacity>
);

MultiSelectListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  avatar: PropTypes.string,
};

MultiSelectListItem.defaultProps = {
  avatar: null,
};

export default MultiSelectListItem;
