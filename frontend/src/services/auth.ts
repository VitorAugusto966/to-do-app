import axios from "axios";

const AUTH_BASE = "http://localhost:8000/auth/";

export const login = (credentials: { username: string; password: string }) => {
  return axios.post(`${AUTH_BASE}token/login/`, credentials);
};

export const register = (data: { username: string; password: string }) => {
  return axios.post(`${AUTH_BASE}users/`, data);
};
