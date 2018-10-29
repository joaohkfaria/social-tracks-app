import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, View,
  Image, Text,
} from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Divider from '../Divider';
import Icon from '../Icon';

const Container = styled(View)`
  padding: 10px;
  padding-left: 0px;
  flex-direction: row;
  align-items: center;
`;

const TrackInfoContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const Title = styled(Text)`
  color: ${Colors.white};
  font-size: 16px;
`;

const Artist = styled(Text)`
  color: ${Colors.ultraLightGrey};
  font-size: 12px;
`;

const AlbumImage = styled(Image)`
  width: 50px;
  height: 50px;
`;

const playStatusIcon = {
  playing: 'play',
  paused: 'pause',
};

const TrackItem = ({
  onPress, name,
  artist, album,
  playStatus,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={{ flexDirection: 'column' }}>
      <Container>
        <AlbumImage source={{ uri: album }} />
        <TrackInfoContainer>
          <Title>{name}</Title>
          <Artist>{artist}</Artist>
        </TrackInfoContainer>
        {
          playStatus !== 'none'
          && <Icon name={playStatusIcon[playStatus]} color="white" size={18} />
        }
      </Container>
      <Divider />
    </View>
  </TouchableOpacity>
);

TrackItem.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  playStatus: PropTypes.string,
};

TrackItem.defaultProps = {
  onPress: () => null,
  playStatus: 'none',
};

export default TrackItem;
