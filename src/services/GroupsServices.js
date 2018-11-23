import { API_URL } from '../../config';
import { request, POST, GET } from './NetworkService';
import { getUser } from './UsersService';

export async function getGroups() {
  // Getting user
  const user = await getUser();
  // Setting params
  const params = {
    user_id: user._id,
  };
  // Fetching API
  const response = await request(API_URL, GET, 'groups', params);
  if (response.error) throw new Error('Error getting groups from API');

  return response.result;
}

export async function createGroup(name, userIds) {
  // Getting the user
  const user = await getUser();
  // Setting params
  const params = {
    name,
    user_id: user._id,
    user_ids: userIds,
  };
  // Fetching API
  const response = await request(API_URL, POST, 'groups', params);
  if (response.error) throw new Error('Error creating group on API');

  return response.result;
}
