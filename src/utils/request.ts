import axios from 'axios';

const token = 'admin-token';
const apiBaseURL = 'https://easy-mock.com/mock/5c717d836919293ce76aae35/tapanel';

const service = axios.create({
  baseURL: apiBaseURL,
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Token header to every request, you can add other custom headers here
    if (token) {
      config.headers['X-Token'] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // code == 60204: account or password is incorrect
    // You can change this part for your own usage.
    const res = response.data;
    if (res.code !== 20000) {
      // console.log(res.message);
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // console.log('Token problem');
        // then log out
      }
      return Promise.reject('error with code: ' + res.code);
    } else {
      return response.data;
    }
  },
  (error) => {
    // console.log(error.message);
    return Promise.reject(error);
  },
);

export default service;
