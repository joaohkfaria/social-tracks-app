import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Spotify from 'rn-spotify-sdk';
import { observer } from 'mobx-react';
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

@observer
class ListenScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      playingStatus: 'paused',
      playingSong: null,
      group: null,
    };
    // Binding functions
    this.handlePlayPlayer = this.handlePlayPlayer.bind(this);
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.getNextSong = this.getNextSong.bind(this);

    Spotify.addListener('trackDelivered', ({ metadata }) => {
      // Getting current track that played
      const { currentTrack } = metadata;
      console.info('TRACK DELIVERED', currentTrack);
      // Getting next song
      const nextSong = this.getNextSong(currentTrack.uri);
      // Playing if next song exist
      if (nextSong) {
        this.handlePlaySong(nextSong);
      } else {
        // Clean playing song if there's no song
        this.setState({
          playingStatus: 'paused',
          playingSong: null,
        });
      }
    });
  }

  componentDidMount() {
    // Getting recommendations
    this.getRecommendations();
  }

  componentWillUnmount() {
    // Pausing song on unmount
    Spotify.setPlaying(false);
    // Reset recommendation
    const { store } = this.props;
    store.resetRecommendations();
  }

  getNextSong(currentSpotifyUri) {
    const { store } = this.props;
    const { recommendations } = store;
    const numTracks = recommendations.length;
    let currentIndex = -1;

    // Finding current playing index
    for (let i = 0; i < numTracks; i += 1) {
      const track = recommendations[i];
      if (currentSpotifyUri === track.uri) {
        // We've found the track, save it and break
        currentIndex = i;
        break;
      }
    }

    // Checking if we can get the next song
    if (currentIndex !== -1 && currentIndex < (numTracks - 1)) {
      // Return the next song
      return recommendations[currentIndex + 1];
    }

    return null;
  }

  async getRecommendations() {
    // Getting props
    const { store } = this.props;
    try {
      // Setting is loading
      store.setLoadingRecommendations();
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
      store.setRecommendations({
        isGeneratingRecommendation: recommendation.generating_recommendation,
        influenceFactors: recommendation.influence_factors,
        recommendations: recommendation.recommendation_tracks,
        ratings: ratingsObj,
      });
    } catch (error) {
      console.info(error);
      // Setting error
      store.setErrorRecommendations();
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
    // Getting state
    const { playingSong } = this.state;
    // Getting props
    const { store } = this.props;
    // Getting from mobx store
    const { ratings } = store;
    // If it's not the current playing song, just ignore it
    if (!playingSong) return;
    try {
      // Setting rating on songId
      store.setRatings({ ...ratings, [playingSong.id]: ratingValue });
      // Creating rating
      await createRating(playingSong.id, ratingValue);
    } catch (error) {
      // Setting previous rate again
      store.setRatings({ ...ratings, [playingSong.id]: ratings[playingSong.id] });
      showOkAlert('Setting Rating', 'Unable to set rating for this song, please, try again');
    }
  }

  renderItem(listItem) {
    // Getting props
    const { store } = this.props;
    const { item } = listItem;
    // Getting state
    const {
      playingSong,
      playingStatus,
    } = this.state;
    // Getting from mobx
    const {
      ratings,
    } = store;

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
    // Getting props
    const { store } = this.props;
    // Getting state
    const {
      playingStatus,
      playingSong,
      group,
    } = this.state;
    // Getting from Mobx Store
    const {
      recommendations, ratings,
      isLoadingRecommendations, errorLoadingRecommendations,
      isGeneratingRecommendation,
    } = store;

    if (errorLoadingRecommendations) {
      return (
        <DefaultLayout padded paddingBar>
          <ErrorMessage onRetry={() => this.getRecommendations()} />
        </DefaultLayout>
      );
    }

    const renderContent = () => (
      <>
        <DefaultLayout padded paddingBar>
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
              flex: 1,
            }}
            refreshing={isLoadingRecommendations}
            onRefresh={this.getRecommendations}
          />
        </DefaultLayout>
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
      <DefaultLayout>
        {
          isGeneratingRecommendation
            ? (
              <DefaultLayout padded padddingBar>
                <GeneratingRecommendation
                  onRefresh={() => this.getRecommendations()}
                  isRefreshing={isLoadingRecommendations}
                />
              </DefaultLayout>
            )
            : renderContent()
        }
      </DefaultLayout>
    );
  }
}

ListenScreen.propTypes = {
  store: PropTypes.object.isRequired,
};

export default ListenScreen;
