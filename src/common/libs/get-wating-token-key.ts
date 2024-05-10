export const getConcertWatingTokenKey = () => {
  const key = process.env.CONCERT_WATING_TOKEN_KEY;
  if (!key) {
    throw new Error('key is not defined');
  }
  return key;
};

export const getConcertActiveTokenKey = () => {
  const key = process.env.CONCERT_ACTIVE_TOKEN_KEY;
  if (!key) {
    throw new Error('key is not defined');
  }
  return key;
};
