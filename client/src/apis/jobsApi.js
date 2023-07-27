import axios from 'axios';

const jobsApi = axios.create({ baseURL: '/api/v1' });
// const jobsApi = axios.create({ baseURL: 'http://localhost:3001' });

export default jobsApi;
