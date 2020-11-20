const AuthService = () => {
  return JSON.parse(localStorage.getItem('caribou-advisor'));
};

export default AuthService;
