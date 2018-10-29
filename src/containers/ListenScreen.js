import React from 'react';
import { FlatList } from 'react-native';
import DefaultLayout from '../layout/DefaultLayout';
import TrackItem from '../components/music/TrackItem';
import Title from '../components/Title';

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


const ListenScreen = () => {
  function renderItem(listItem) {
    const { item } = listItem;

    return (
      <TrackItem
        name={item.name}
        artist={item.artist}
        album={item.album}
        playStatus={item.id === '1' ? 'playing' : 'none'}
      />
    );
  }

  return (
    <DefaultLayout padded paddingBar>
      <Title>Made for Work group</Title>
      <FlatList
        data={mockTracks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{ width: '100%', marginTop: 20, flex: 1 }}
      />
    </DefaultLayout>
  );
};

export default ListenScreen;
