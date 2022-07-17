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
