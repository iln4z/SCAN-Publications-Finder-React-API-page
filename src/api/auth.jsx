import axios from 'axios';

const API_URL = 'https://gateway.scan-interfax.ru/api/v1';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/account/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAccountInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/account/info`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};