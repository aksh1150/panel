const cookiesExpiration = minutes => {
  const time = minutes * 60 * 1000;
  return new Date(new Date().getTime() + time);
};

export default cookiesExpiration;
