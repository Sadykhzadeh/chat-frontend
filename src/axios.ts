import axios from 'axios';

// axios is a promise based HTTP client for the browser and node.js
const mainServer = axios.create({
  baseURL: 'http://64.227.78.16:8081/chat/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainServer;