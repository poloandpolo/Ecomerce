import axios from 'axios';

const BASE_URL = 'https://ecommerce-json-jwt.onrender.com';

// Función para obtener headers con el token
const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

const registerUserService = (data) => axios.post(`${BASE_URL}/register`, data);
const loginUserService = (data) => axios.post(`${BASE_URL}/login`, data);
const getMeUserService = (jwt) => axios.get(`${BASE_URL}/me`, getHeaders(jwt));
const registerNewProduct = (data, token) => axios.post(`${BASE_URL}/items`, data, getHeaders(token));

export {
  registerUserService,
  loginUserService,
  getMeUserService,
  registerNewProduct
};
