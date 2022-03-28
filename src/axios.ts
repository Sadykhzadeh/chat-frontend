import axios from 'axios';

const mainServer = axios.create({
  baseURL: 'http://64.227.78.16:8081/chat/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainServer;