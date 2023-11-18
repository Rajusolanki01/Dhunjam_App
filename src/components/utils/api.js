// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://stg.dhunjam.in/account/admin';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const getAdminDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get admin details', error);
    throw error;
  }
};

export const updatePrice = async (id, priceData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { amount: priceData });
    return response.data;
  } catch (error) {
    console.error('Failed to update prices', error);
    throw error;
  }
};
