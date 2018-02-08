const isDevelopment = process.env.NODE_ENV === 'development';

export const BINS_API = isDevelopment
  ? 'http://localhost:8082'
  : 'http://188.226.135.240/bins-api';

export const LIBRARIES_API = 'https://slide-82a2b.firebaseio.com/libraries.json';
