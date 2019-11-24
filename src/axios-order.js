import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-78f2c.firebaseio.com/'
});

export default instance;