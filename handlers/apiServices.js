import axios from 'axios';

const API_URL = 'http://YOUR_SERVER_URL'; // Replace with your deployed Node API

export const onboardOperator = async (operatorData) => {
  const response = await axios.post(`${API_URL}/api/operator/onboard`, operatorData);
  return response.data;
};

export const generateNQR = async (paymentData) => {
  const response = await axios.post(`${API_URL}/api/payment/nqr`, paymentData);
  return response.data;
};
