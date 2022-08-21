import axios from 'axios';
import {ENDPOINT} from '../global/endPoint';

export const getBikeBrands = async () => {
  const response = await axios.get(`${ENDPOINT}/getBikesBrands`);
  return response;
};

export const getBikeDetailsList = async (id: string) => {
  const response = await axios.get(`${ENDPOINT}/getBikeBrandsId/${id}`);
  return response;
};
export const getBikeProblems = async () => {
  const response = await axios.get(`${ENDPOINT}/getBikePrblems`);
  return response;
};

export const sendNotifications = async (
  userId: string,
  description: string,
  model: string,
  fetchStatus: string,
  registrationNo: string,
) => {
  const data = JSON.stringify({
    description: description,
    model: model,
    registrationNo: registrationNo,
    fetchStatus: fetchStatus,
    userId: userId,
  });

  const response = await axios.post(
    `${ENDPOINT}/Confirmnotification/${userId}`,
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

