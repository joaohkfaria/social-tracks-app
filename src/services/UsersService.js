import { AsyncStorage } from 'react-native';
import { request, GET } from './NetworkService';
import { API_URL } from '../../config';

export async function loginSpotify(accessToken) {
  // Setting params
  const params = {
    access_token: accessToken,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'users/login_spotify', params);
  if (response.error) throw new Error('Error sending token to API');

  return response.result;
}

export async function saveUser(user) {
  const userJson = JSON.stringify(user);
  // Set the user on async storage
  await AsyncStorage.setItem('@SocialTracksStore:user', userJson);
}

export async function getUser() {
  const userJson = await AsyncStorage.getItem('@SocialTracksStore:user');
  // If there's no user, just return null
  if (!userJson) return null;
  // Return parsed object
  return JSON.parse(userJson);
}

export async function logout() {
  // Just remove the user key
  await AsyncStorage.removeItem('@SocialTracksStore:user');
}

export async function loginMastodon(authCode, userId) {
  // Setting params
  const params = {
    authorization_code: authCode,
    user_id: userId,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'users/login_mastodon', params);
  if (response.error) throw new Error('Error sending mastodon credentials to API');

  return response.result;
}
