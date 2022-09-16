import axios from 'axios';
import {ENDPOINT} from '../global/endPoint';

export const getUserProfile = async (userId: string) => {
  const response = await axios.get(`${ENDPOINT}/getUserProfile/${userId}`);
  return response;
};

export const getUserBikeDetails = async (userId: string) => {
  const response = await axios.get(`${ENDPOINT}/getMyBike/${userId}`);
  return response;
};
