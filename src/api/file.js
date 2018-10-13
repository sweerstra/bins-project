import Request from '../api/Request';

const getFilename = (url) => {
  return url.split('/').pop();
};

const getBinFromFile = async (url) => {
  const name = getFilename(url);
  const code = await Request.getText(url);

  return { name, code };
};

export default { getBinFromFile };
