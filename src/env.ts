// Constants
const isProd = process.env.NODE_ENV === 'production';

// Environment
export const env = {
  API_BASE_URL: isProd ? 'https://www.capellari.net:8443/api' : 'http://localhost:8000/api',
  BASENAME: isProd ? '/community-vpn' : '/'
};