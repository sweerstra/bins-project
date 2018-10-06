import Request from '../api/Request';

const getFilename = (url) => {
  return url.split('/').pop();
};

const getCode = async (url) => {
  const name = getFilename(url);
  const gist = await Request.getText(url);

  return { name, selection: gist };
};

export default { getCode };
