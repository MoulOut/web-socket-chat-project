import { scryptSync, timingSafeEqual } from 'crypto';

function authenticateUser(password, user) {
  const hashTest = scryptSync(password, user.saltPass, 64);

  const realHash = Buffer.from(user.password, 'hex');

  const authenticated = timingSafeEqual(hashTest, realHash);

  return authenticated;
}

export default authenticateUser;
