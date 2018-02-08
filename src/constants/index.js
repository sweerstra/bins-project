const isProduction = process.env.NODE_ENV === 'production';

export const BINS_API = isProduction
  ? 'http://188.226.135.240/bins-api'
  : 'http://localhost:8082';

export const AUTH_API = 'http://localhost:8082/auth';

export const LIBRARIES_API = 'https://slide-82a2b.firebaseio.com/libraries.json';
