import axios from 'axios'

axios.defaults.baseURL = process.env.baseUrl ? process.env.baseUrl : 'http://127.0.0.1:8000/api'

if (process.env.VUE_APP_LOG_RESPONSES) {
    axios.interceptors.response.use(
      (response) => {
          console.log(response.data);
          return response;
      }, (error) => {
          console.log(error.response.data);
          return Promise.reject(error);
      });
}