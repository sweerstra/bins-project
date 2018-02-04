const textToClipboard = (text) => {
  const mark = document.createElement('textarea');
  document.body.appendChild(mark);
  mark.value = text;
  mark.select();
  document.execCommand('copy');
  document.body.removeChild(mark);
};

export default textToClipboard;
