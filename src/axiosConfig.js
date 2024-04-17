import axios from 'axios';
import config from './config'; // Import the config file


const axiosInstance = axios.create({
  baseURL: config.apiUrl,
});

// Add a request interceptor to include the authentication token in the requests
axiosInstance.interceptors.request.use(
  (config) => {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
        try {
          // Try parsing user data
          const userData = JSON.parse(userDataString);
          // Check if user data is valid (presence of token)
          if (userData && userData.token) {
              config.headers.Authorization = `Token ${userData.token}`;                        
          } else {
            // If token is not present, remove user data from local storage
            localStorage.removeItem('userData');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          // In case of error parsing user data, remove user data from local storage
          localStorage.removeItem('userData');
        }
      }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
