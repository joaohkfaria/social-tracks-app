import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from '../Icon';
import Colors from '../../constants/Colors';

const PlayContainer = styled(View)`
  width: 40px;
  height: 40px;
  border-color: ${Colors.white};
  border-width: 1px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const iconName = {
  paused: 'play',
  playing: 'pause',
};

const paddingLeftByIcon = {
  paused: 3,
  playing: 0,
};

const PlayButton = ({ playingStatus, onPress }) => (
  <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
    <PlayContainer>
      <Icon
        name={iconName[playingStatus]}
        size={20}
        color={Colors.white}
        style={{ paddingLeft: paddingLeftByIcon[playingStatus] }}
      />
    </PlayContainer>
  </TouchableOpacity>
);

PlayButton.propTypes = {
  playingStatus: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

PlayButton.defaultProps = {
  onPress: () => null,
};

export default PlayButton;
