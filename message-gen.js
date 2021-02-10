const messages = [
  'feed me',
  'pet me',
  'stop petting me',
  'get off of teams and pay attention to me',
  'i can haz cheezburger',
  'I will eat you when you die',
];

const getCatMsg = () => {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

module.exports = {
  getCatMsg,
}