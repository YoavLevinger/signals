import { AppConfig } from './types';

const config: AppConfig = {
  backendHost: process.env.REACT_APP_BACKEND_HOST || 'http://localhost:4001'
};

export default config;

