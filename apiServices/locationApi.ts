import axios from 'axios';
import {ENDPOINT} from '../global/endPoint';

export const saveLocation = async (
  userId: string,
  latitude: number,
  longitude: number,
) => {
  const data = JSON.stringify({
    latitude: latitude,
    longitude: longitude,
  });
  const response = await axios.post(
    `${ENDPOINT}/userSaveLocation/${userId}`,
    data,
    {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};
