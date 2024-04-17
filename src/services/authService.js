import axios from 'axios';
import config from '../config'; // Import the config file

class AuthService {
    async register(data) {
          return  axios.post(`${config.apiUrl}/api/auth/signup/`, data);
    }
    
  async login(email, password) {
      console.log("param: ",  {
        "email": email,
        "password": password
    })

      return axios.post(`${config.apiUrl}/api/auth/login/`, {
        "email": email,
        "password": password
    });
  }

  logout() {
    localStorage.removeItem('userData');
  }

  getCurrentUser() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
  }
}

export default new AuthService();
