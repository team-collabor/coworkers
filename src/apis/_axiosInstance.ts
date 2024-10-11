import axios from 'axios';

const TEAM_ID = '8-4';
const BASE_URL = `https://fe-project-cowokers.vercel.app/${TEAM_ID}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
