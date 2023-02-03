import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
});

instance.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const auth = JSON.parse(user);
      config.headers = { authorization: `${auth.token}` };
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
