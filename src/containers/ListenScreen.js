import React from 'react';
import { FlatList } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import DefaultLayout from '../layout/DefaultLayout';
import TrackItem from '../components/music/TrackItem';
import Title from '../components/Title';
import MusicPlayer from '../components/music/MusicPlayer';
import { getRecommendations } from '../services/RecommendationsServices';
import { getRatings, createRating, formatRatingsObj } from '../services/RatingService';
import { showOkAlert } from '../services/AlertService';
import ErrorMessage from '../components/ErrorMessage';
import { getGroup } from '../services/UsersService';
import GeneratingRecommendation from '../components/GeneratingRecommendation';

class ListenScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      playingStatus: 'paused',
      playingSong: null,
      ratings: {},
      recommendations: [],
      isGeneratingRecommendation: false,
      isLoadingRecommendations: true,
      errorLoadingRecommendations: false,
      group: null,
    };
    // Binding functions
    this.handlePlayPlayer = this.handlePlayPlayer.bind(this);
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
  }

  componentDidMount() {
    // Getting recommendations
    this.getRecommendations();
  }

  componentWillUnmount() {
    // Pausing song on unmount
    Spotify.setPlaying(false);
  }

  async getRecommendations() {
    try {
      // Setting is loading
      this.setState({ isLoadingRecommendations: true, errorLoadingRecommendations: false });
      // Getting group
      const group = await getGroup();
      // Setting group on state
      this.setState({ group });
      // Getting recommendation
      const { recommendation } = await getRecommendations(group._id);
      // Getting ratings
      const { ratings } = await getRatings();
      // Generating ratings in object format
      const ratingsObj = formatRatingsObj(ratings);
      // Setting recommendations
      this.setState({
        isGeneratingRecommendation: recommendation.generating_recommendation,
        recommendations: recommendation.recommendation_tracks,
        isLoadingRecommendations: false,
        errorLoadingRecommendations: false,
        ratings: ratingsObj,
      });
    } catch (error) {
      console.info(error);
      // Setting error
      this.setState({ errorLoadingRecommendations: true, isLoadingRecommendations: false });
    }
  }

  handlePlayPlayer() {
    const { playingStatus, playingSong } = this.state;
    // Getting new playing status
    const newPlayingStatus = playingSong && playingStatus === 'playing' ? 'paused' : 'playing';

    // Set playing status
    Spotify.setPlaying(newPlayingStatus === 'playing');
    // Setting new state
    this.setState({ playingStatus: newPlayingStatus });
  }

  async handlePlaySong(song) {
    // Getting state
    const { playingSong, playingStatus } = this.state;
    const newPlayingStatus = playingSong && playingSong.id === song.id && playingStatus === 'playing' ? 'paused' : 'playing';

    // If it's a diferent song, set the spotify url from beggining
    if (!playingSong || playingSong.id !== song.id) {
      Spotify.playURI(song.uri, 0, 0);
    }
    // Set playing status
    Spotify.setPlaying(newPlayingStatus === 'playing');

    this.setState({
      playingSong: song,
      playingStatus: newPlayingStatus,
    });
  }

  async handleChangeRating(ratingValue) {
    const { ratings, playingSong } = this.state;
    // If it's not the current playing song, just ignore it
    if (!playingSong) return;
    try {
      // Setting rating on songId
      this.setState({
        ratings: { ...ratings, [playingSong.id]: ratingValue },
      });
      // Creating rating
      await createRating(playingSong.id, ratingValue);
    } catch (error) {
      // Setting previous rate again
      this.setState({
        ratings: { ...ratings, [playingSong.id]: ratings[playingSong.id] },
      });
      showOkAlert('Setting Rating', 'Unable to set rating for this song, please, try again');
    }
  }

  renderItem(listItem) {
    const { item } = listItem;
    const {
      playingSong,
      playingStatus,
      ratings,
    } = this.state;

    return (
      <TrackItem
        name={item.name}
        artist={item.artists.map(artist => artist.name).join(', ')}
        album={item.album.images[0].url}
        playStatus={playingSong && item.id === playingSong.id ? playingStatus : 'none'}
        onPress={() => this.handlePlaySong(item)}
        rating={ratings[item.id]}
      />
    );
  }

  render() {
    const {
      playingStatus, playingSong, ratings,
      isLoadingRecommendations, errorLoadingRecommendations,
      recommendations, group,
      isGeneratingRecommendation,
    } = this.state;

    if (errorLoadingRecommendations) {
      return (
        <DefaultLayout padded paddingBar>
          <ErrorMessage onRetry={() => this.getRecommendations()} />
        </DefaultLayout>
      );
    }

    const renderContent = () => (
      <>
        <Title>
          {group ? `Recommendations for ${group.name}` : ''}
        </Title>
        <FlatList
          data={recommendations}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          style={{
            width: '100%',
            marginTop: 20,
            marginBottom: 65,
            flex: 1,
          }}
          refreshing={isLoadingRecommendations}
          onRefresh={this.getRecommendations}
        />
        <MusicPlayer
          name={playingSong ? playingSong.name : null}
          album={playingSong ? playingSong.album.images[0].url : null}
          artist={playingSong ? playingSong.artists.map(artist => artist.name).join(', ') : null}
          playingStatus={playingStatus}
          onPressPlay={this.handlePlayPlayer}
          rating={playingSong ? ratings[playingSong.id] : null}
          onChangeRating={newRating => this.handleChangeRating(newRating)}
        />
      </>
    );

    return (
      <DefaultLayout padded paddingBar>
        {
          isGeneratingRecommendation
            ? (
              <GeneratingRecommendation
                onRefresh={() => this.getRecommendations()}
                isRefreshing={isLoadingRecommendations}
              />
            )
            : renderContent()
        }
      </DefaultLayout>
    );
  }
}

export default ListenScreen;
