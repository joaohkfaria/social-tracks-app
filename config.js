/**
 * SOCIAL TRACKS CONFIG
 */
const apiUrl = {
  development: 'http://localhost:3000',
  production: 'https://social-tracks.herokuapp.com',
};
export const API_URL = apiUrl.development;

/**
 * SPOTIFY CONFIG
 */
const spotifyLoginUrl = {
  development: 'http://localhost:3000/users/login_spotify',
  production: 'https://social-tracks.herokuapp.com/users/login_spotify',
};
export const SPOTIFY_CLIENT_ID = '33d3775d9882478686780f7c9a92d071';
export const SPOTIFY_REDIRECT_URL = spotifyLoginUrl.development;
const spotifyRefreshUrl = {
  development: 'http://localhost:3000/spotify/refresh',
  production: 'https://social-tracks.herokuapp.com/spotify/refresh',
};
const spotifySwapUrl = {
  development: 'http://localhost:3000/spotify/swap',
  production: 'https://social-tracks.herokuapp.com/spotify/swap',
};
export const SPOTIFY_REFRESH_URL = spotifyRefreshUrl.development;
export const SPOTIFY_SWAP_URL = spotifySwapUrl.development;
export const SPOTIFY_SCOPES = ['streaming', 'user-follow-read', 'user-library-read', 'user-top-read'];

/**
 * MASTODON CONFIG
 */
export const MASTODON_AUTH_URL = 'https://socialtracks.masto.host/oauth/authorize?scope=read&response_type=code&redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_id=06738ef19e97d74a1078948a6981524aa366389d8b0e1afe84130df1e06c0f64';
