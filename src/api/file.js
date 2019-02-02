import Request from '../api/Request';

export const getFilename = (url) => {
  if (!url) {
    return '';
  }

  return url
    .split('/')
    .filter(Boolean)
    .pop();
};

export const getBinFromFile = async (url) => {
  const name = getFilename(url);
  const code = await Request.getText(url);

  return { name, code };
};
