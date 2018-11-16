import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components';
import Spinner from './Spinner';
import PrimaryButton from './PrimaryButton';
import MusicBackground from '../images/music-background.jpeg';
import SocialBackground from '../images/social-background.jpeg';
import Colors from '../constants/Colors';

const BackImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  resize-mode: cover;
  width: 100%;
  height: 100%;
`;

const Title = styled(Text)`
  font-size: 20px;
  color: ${Colors.white};
  margin-bottom: 10px;
  text-align: center;
  font-weight: 400;
`;

const Subtitle = styled(Text)`
  font-size: 16px;
  color: white;
  text-align: center;
  font-weight: 400;
`;

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${Colors.defaultBackground};
`;

const TextContainer = styled(View)`
  flex: 1;
  padding: 22px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const ButtonContainer = styled(View)`
  flex: 1;
  padding: 22px;
  justify-content: flex-start;
`;

const Overlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ConnectFull = ({ loading, type, handleConnect }) => {
  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  const label = type === 'spotify' ? 'Connect with Spotify' : 'Connect with Twitter';
  const backgroundImage = type === 'spotify' ? MusicBackground : SocialBackground;
  let title = '';
  let subtitle = '';
  if (type === 'spotify') {
    title = 'CONNECT YOUR MUSIC';
    subtitle = 'Login with your Spotify account to listen to the perfect songs with your friends';
  } else if (type === 'twitter') {
    title = 'SET YOUR SOCIAL NETWORK';
    subtitle = 'Login with your Twitter account to listen to search for your friends and create your groups';
  }

  return (
    <Container>
      <BackImage
        source={backgroundImage}
      />
      <Overlay />
      <TextContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextContainer>
      <ButtonContainer>
        <PrimaryButton
          title={label}
          onPress={handleConnect}
          backgroundColor={type}
          iconName={type}
        />
      </ButtonContainer>
    </Container>
  );
};

ConnectFull.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string.isRequired,
  handleConnect: PropTypes.func,
};

ConnectFull.defaultProps = {
  loading: false,
  handleConnect: () => null,
};

export default ConnectFull;
