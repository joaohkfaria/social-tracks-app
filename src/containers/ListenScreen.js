import React from 'react';
import { FlatList } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import DefaultLayout from '../layout/DefaultLayout';
import TrackItem from '../components/music/TrackItem';
import Title from '../components/Title';
import MusicPlayer from '../components/music/MusicPlayer';
import Spinner from '../components/Spinner';
import { getRecommendations } from '../services/RecommendationsServices';
import { getRatings, createRating, formatRatingsObj } from '../services/RatingService';
import { showOkAlert } from '../services/AlertService';

class ListenScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      playingStatus: 'paused',
      playingSong: null,
      ratings: {},
      recommendations: [],
      isLoadingRecommendations: true,
      errorLoadingRecommendations: false,
    };
    // Binding functions
    this.handlePlayPlayer = this.handlePlayPlayer.bind(this);
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    // Getting recommendations
    this.getRecommendations();
  }

  async getRecommendations() {
    try {
      // Setting is loading
      this.setState({ isLoadingRecommendations: true });
      // TODO: Get group id
      const { recommendations } = await getRecommendations('1');
      // Getting ratings
      const { ratings } = await getRatings();
      // Generating ratings in object format
      const ratingsObj = formatRatingsObj(ratings);
      // Setting recommendations
      this.setState({
        recommendations,
        isLoadingRecommendations: false,
        ratings: ratingsObj,
      });
    } catch (error) {
      // Setting error
      this.setState({ errorLoadingRecommendations : true, isLoadingRecommendations: false });
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
    const { playingSong, playingStatus, ratings } = this.state;

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
      recommendations,
    } = this.state;

    if (isLoadingRecommendations) {
      return (
        <DefaultLayout padded paddingBar>
          <Spinner />
        </DefaultLayout>
      );
    }

    if (errorLoadingRecommendations) {
      return (
        <DefaultLayout padded paddingBar />
      );
    }

    return (
      <DefaultLayout padded paddingBar>
        <Title>Made for your group</Title>
        <FlatList
          data={recommendations}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          style={{ width: '100%', marginTop: 20, flex: 1 }}
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
      </DefaultLayout>
    );
  }
}

export default ListenScreen;
