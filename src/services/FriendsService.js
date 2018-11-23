import { API_URL } from '../../config';
import { request, GET } from './NetworkService';
import { getUser } from './UsersService';

export async function getFriends() {
  // Getting user
  const user = await getUser();
  // Setting params
  const params = {
    user_id: user._id,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'friends', params);
  if (response.error) throw new Error('Error getting friends from API');

  return response.result;
}
