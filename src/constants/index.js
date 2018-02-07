const isDevelopement = process.env.NODE_ENV === 'developement';

export const BINS_API = isDevelopement
  ? 'http://localhost:8082'
  : 'http://188.226.135.240/bins-api';

export const LIBRARIES_API = 'https://slide-82a2b.firebaseio.com/libraries.json';
