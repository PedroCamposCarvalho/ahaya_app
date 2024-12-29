import axios from 'axios';
import Environment from '../Config/Environment';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDU2MjA5NjEsInN1YiI6IjlmYzBhNDY0LWI3YWEtNDk0ZC1hZDdkLTNiYWNmOWMzMzBmMSJ9.MPEchPsQuvpnVJ5TMugHFIv2UT6ANUnepbx-zhQM1A8';

const api = axios.create({
  baseURL: Environment.url,
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
