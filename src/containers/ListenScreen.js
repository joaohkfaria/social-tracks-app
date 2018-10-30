import React from 'react';
import { FlatList } from 'react-native';
import DefaultLayout from '../layout/DefaultLayout';
import TrackItem from '../components/music/TrackItem';
import Title from '../components/Title';
import MusicPlayer from '../components/music/MusicPlayer';

const mockTracks = [
  {
    id: '1',
    name: 'Money',
    artist: 'Pink Floyd',
    album: 'https://upload.wikimedia.org/wikipedia/pt/3/3b/Dark_Side_of_the_Moon.png',
  },
  {
    id: '2',
    name: 'Heaven and Hell',
    artist: 'Black Sabbath',
    album: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Black_Sabbath_Heaven_and_Hell.jpg',
  },
  {
    id: '3',
    name: 'Highway to Hell',
    artist: 'AC/DC',
    album: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/ac/Acdc_Highway_to_Hell.JPG/220px-Acdc_Highway_to_Hell.JPG',
  },
];


class ListenScreen extends React.Component {
  constructor(props) {
    super(props);
    // Setting initial state
    this.state = {
      playingStatus: 'paused',
      playingSong: null,
      ratings: {},
    };
    // Binding functions
    this.handlePlayPlayer = this.handlePlayPlayer.bind(this);
    this.handlePlaySong = this.handlePlaySong.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  handlePlayPlayer() {
    const { playingStatus, playingSong } = this.state;

    if (playingStatus === 'paused' && playingSong !== null) {
      this.setState({ playingStatus: 'playing' });
    } else {
      this.setState({ playingStatus: 'paused' });
    }
  }

  handlePlaySong(song) {
    const { playingSong, playingStatus } = this.state;

    this.setState({
      playingStatus: playingSong && playingSong.id === song.id && playingStatus === 'playing' ? 'paused' : 'playing',
      playingSong: song,
    });
  }

  handleChangeRating(rating) {
    const { ratings, playingSong } = this.state;

    if (!playingSong) return;

    // Setting rating on songId
    this.setState({
      ratings: {
        ...ratings,
        [playingSong.id]: rating,
      },
    });
  }

  renderItem(listItem) {
    const { item } = listItem;
    const { playingSong, playingStatus, ratings } = this.state;

    return (
      <TrackItem
        name={item.name}
        artist={item.artist}
        album={item.album}
        playStatus={playingSong && item.id === playingSong.id ? playingStatus : 'none'}
        onPress={() => this.handlePlaySong(item)}
        rating={ratings[item.id]}
      />
    );
  }

  render() {
    const { playingStatus, playingSong, ratings } = this.state;

    return (
      <DefaultLayout padded paddingBar>
        <Title>Made for Work group</Title>
        <FlatList
          data={mockTracks}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          style={{ width: '100%', marginTop: 20, flex: 1 }}
        />
        <MusicPlayer
          name={playingSong ? playingSong.name : null}
          album={playingSong ? playingSong.album : null}
          artist={playingSong ? playingSong.artist : null}
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
