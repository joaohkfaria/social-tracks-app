import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import NoAlbumImage from '../../images/audio-icon.png';
import PlayButton from './PlayButton';

const Container = styled(View)`
  flex-direction: row;
  background-color: ${Colors.darkContrast};
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px;
  align-items: center;
`;

const TrackInfoContainer = styled(View)`
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
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

const MusicPlayer = ({
  playingStatus,
  name, artist,
  album, onPressPlay,
}) => (
  <Container>
    {
      album
        ? <AlbumImage source={{ uri: album }} />
        : <AlbumImage source={NoAlbumImage} />
    }
    <TrackInfoContainer>
      <Title>{name || 'Not Playing'}</Title>
      <Artist>{artist || 'Not Selected'}</Artist>
    </TrackInfoContainer>
    <PlayButton
      playingStatus={playingStatus}
      onPress={onPressPlay}
    />
  </Container>
);

MusicPlayer.propTypes = {
  playingStatus: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string,
  onPressPlay: PropTypes.func,
};

MusicPlayer.defaultProps = {
  album: null,
  name: null,
  playingStatus: 'paused',
  artist: null,
  onPressPlay: () => null,
};

export default MusicPlayer;
