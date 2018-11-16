const apiUrl = {
  development: 'http://localhost:3000',
  production: 'https://social-tracks.herokuapp.com',
};

export const API_URL = apiUrl.development;

const spotifyLoginUrl = {
  development: 'http://localhost:3000/users/login_spotify',
  production: 'https://social-tracks.herokuapp.com/users/login_spotify',
};

export const SPOTIFY_CLIENT_ID = '33d3775d9882478686780f7c9a92d071';
export const SPOTIFY_REDIRECT_URL = spotifyLoginUrl.development;
