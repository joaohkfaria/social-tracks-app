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

  return response;
}

export async function loginMastodon(authCode) {
  // Setting params
  const params = {
    authorization_code: authCode,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'users/login_mastodon', params);
  if (response.error) throw new Error('Error sending mastodon credentials to API');

  return response;
}
