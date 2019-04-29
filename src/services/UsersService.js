import AsyncStorage from '@react-native-community/async-storage';
import { request, GET } from './NetworkService';
import { API_URL } from '../../config';

export async function loginSpotify(accessToken) {
  // Setting params
  const params = {
    access_token: accessToken,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'users/login_spotify', params);
  if (response.error) throw new Error(response.error);

  return response.result;
}

export async function selectGroup(group) {
  const groupJson = JSON.stringify(group);
  // Set the group on async storage
  await AsyncStorage.setItem('@SocialTracksStore:group', groupJson);
}

export async function unselectGroup() {
  // Just remove the group key
  await AsyncStorage.removeItem('@SocialTracksStore:group');
}

export async function getGroup() {
  const groupJson = await AsyncStorage.getItem('@SocialTracksStore:group');
  // If there's no user, just return null
  if (!groupJson) return null;
  // Return parsed object
  return JSON.parse(groupJson);
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

export async function updateMastodon() {
  const user = await getUser();

  // Setting params
  const params = {
    user_id: user._id,
    mastodon_id: user.mastodon_id,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'users/update_mastodon', params);
  if (response.error) throw new Error('Error updating mastodon info');

  return response.result;
}
