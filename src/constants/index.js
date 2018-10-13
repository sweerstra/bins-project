const isDevelopment = process.env.NODE_ENV === 'development';

export const BINS_API = isDevelopment ? '' : 'bins-api';
