import Spotify from 'rn-spotify-sdk';
import { API_URL } from '../../config';
import { request, GET } from './NetworkService';
import { getUser } from './UsersService';

export async function getRecommendations(groupId) {
  // Getting Spotify access token
  const { accessToken } = await Spotify.getSessionAsync();
  // Getting user
  const user = await getUser();
  // Setting params
  const params = {
    user_id: user._id,
    group_id: groupId,
    spotify_access_token: accessToken,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'recommendations', params);
  if (response.error) throw new Error('Error getting recommendations from API');

  return response.result;
}
