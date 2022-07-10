import axios from 'axios';
import {ENDPOINT} from '../global/endPoint';

export const getOTPForAuthorization = async (phoneNumber: string) => {
  const response: any = await axios.get(
    `${ENDPOINT}/getInOTP/${phoneNumber}/user`,
  );
  return response;
};
export const verifyOTPForAuthorization = async (
  phoneNumber: string,
  otpToVerify: string,
) => {
  const params = JSON.stringify({
    number: phoneNumber,
    otp: otpToVerify,
    usertype: 'user',
  });
  const response = await axios.post(`${ENDPOINT}/verifOtp`, params, {
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
};
export const resendOTP = async (phoneNumber: string) => {
  const response: any = await axios.get(
    `${ENDPOINT}/resendOtp/${phoneNumber}/user`,
  );
  return response;
};
