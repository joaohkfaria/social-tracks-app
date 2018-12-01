import { API_URL } from '../../config';
import { request, GET, POST } from './NetworkService';
import { getUser } from './UsersService';

export async function getRatings() {
  // Getting user
  const user = await getUser();
  // Setting params
  const params = {
    user_id: user._id,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'ratings', params);
  if (response.error) throw new Error('Error getting ratings from API');

  return response.result;
}

export async function createRating(spotifyTrackId, ratingValue) {
  // Getting user
  const user = await getUser();
  // Setting params
  const params = {
    user_id: user._id,
    value: ratingValue,
    spotify_track_id: spotifyTrackId,
  };
  // Fetching API
  const response = await request(API_URL, POST, 'ratings', params);
  if (response.error) throw new Error('Error creating rating from API');

  return response.result;
}

export function formatRatingsObj(ratingsArr) {
  let ratings = {};
  ratingsArr.forEach((rating) => {
    ratings = {
      ...ratings,
      [rating.spotify_track_id]: rating.value,
    };
  });

  return ratings;
}
