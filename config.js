/**
 * SOCIAL TRACKS CONFIG
 */
const apiUrl = {
  development: 'http://192.168.0.249:3000',
  // development: 'http://18.216.97.224:3000',
  production: 'https://social-tracks.herokuapp.com',
};
export const API_URL = apiUrl.development;

/**
 * SPOTIFY CONFIG
 */
const spotifyLoginUrl = {
  development: `${API_URL}/users/login_spotify`,
  production: 'https://social-tracks.herokuapp.com/users/login_spotify',
};
export const SPOTIFY_CLIENT_ID = '33d3775d9882478686780f7c9a92d071';
export const SPOTIFY_REDIRECT_URL = spotifyLoginUrl.development;
const spotifyRefreshUrl = {
  development: `${API_URL}/spotify/refresh`,
  production: 'https://social-tracks.herokuapp.com/spotify/refresh',
};
const spotifySwapUrl = {
  development: `${API_URL}/spotify/swap`,
  production: 'https://social-tracks.herokuapp.com/spotify/swap',
};
export const SPOTIFY_REFRESH_URL = spotifyRefreshUrl.development;
export const SPOTIFY_SWAP_URL = spotifySwapUrl.development;
export const SPOTIFY_SCOPES = ['streaming', 'user-follow-read', 'user-library-read', 'user-top-read', 'user-read-email'];

/**
 * MASTODON CONFIG
 */
const MASTODON_CLIENT_ID = 'd7abf1a2acaa6e8a0893e74557519cc2dad89a0ae74cff7f3d654bd7844411a9';
export const MASTODON_AUTH_URL = `https://socialtracks.masto.host/oauth/authorize?scope=read&response_type=code&redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_id=${MASTODON_CLIENT_ID}`;
