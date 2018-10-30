import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import StarRating from 'react-native-star-rating';
import Colors from '../../constants/Colors';
import NoAlbumImage from '../../images/audio-icon.png';
import PlayButton from './PlayButton';

const Container = styled(View)`
  flex-direction: column;
  background-color: ${Colors.darkContrast};
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px;
  align-items: center;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const Col = styled(View)`
  flex-direction: column;
`;

const TrackInfoContainer = styled(View)`
  flex-direction: column;
  flex: 1;
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
  width: 80px;
  height: 80px;
`;

const MusicPlayer = ({
  playingStatus,
  name, artist,
  album, onPressPlay,
  rating,
  onChangeRating,
}) => (
  <Container>
    <Row>
      <Col>
        {
          album
            ? <AlbumImage source={{ uri: album }} />
            : <AlbumImage source={NoAlbumImage} />
        }
      </Col>
      <Col style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Row>
          <TrackInfoContainer>
            <Title>{name || 'Not Playing'}</Title>
            <Artist>{artist || 'Not Selected'}</Artist>
          </TrackInfoContainer>
        </Row>
        <Row style={{ flex: 1, alignItems: 'center' }}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={onChangeRating}
            fullStarColor={Colors.default}
            starSize={28}
          />
        </Row>
      </Col>
      <Col style={{ justifyContent: 'center' }}>
        <PlayButton
          playingStatus={playingStatus}
          onPress={onPressPlay}
        />
      </Col>
    </Row>
  </Container>
);

MusicPlayer.propTypes = {
  playingStatus: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string,
  onPressPlay: PropTypes.func,
  rating: PropTypes.number,
  onChangeRating: PropTypes.func,
};

MusicPlayer.defaultProps = {
  album: null,
  name: null,
  playingStatus: 'paused',
  artist: null,
  onPressPlay: () => null,
  rating: 0,
  onChangeRating: () => null,
};

export default MusicPlayer;
