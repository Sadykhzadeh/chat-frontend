import axios from 'axios';

// axios is a promise based HTTP client for the browser and node.js
const mainServer = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainServer;