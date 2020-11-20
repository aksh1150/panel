import AuthService from '../authServices';
const authHeader = () => {
  const user = AuthService();
  return { 'x-access-token': user.accessToken };
};

export default authHeader;
