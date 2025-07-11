import axios from 'axios';

const API_URL = 'https://gateway.scan-interfax.ru/api/v1';

const handleUnauthorized = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expire');
  window.location.href = '/login';
};

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    handleUnauthorized();
    throw new Error('Токен авторизации отсутствует');
  }
  return { Authorization: `Bearer ${token}` };
};

export const searchHistograms = async (params) => {
  try {
    const response = await axios.post(
      `${API_URL}/objectsearch/histograms`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...getAuthHeader()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    throw error;
  }
};

export const objectSearch = async (params) => {
  try {
    const response = await axios.post(
      `${API_URL}/objectsearch`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...getAuthHeader()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    console.error('ObjectSearch error:', error);
    throw error;
  }
};

export const searchDocuments = async (ids) => {
  try {
    const response = await axios.post(
      `${API_URL}/documents`,
      { ids },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...getAuthHeader()
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    console.error('Documents error:', error);
    throw error;
  }
};