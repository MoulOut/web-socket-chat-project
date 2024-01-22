import { randomBytes, scryptSync } from 'crypto';

function createHashAndSaltPass(password) {
  const saltPass = randomBytes(16).toString('hex');
  const hashPass = scryptSync(password, saltPass, 64).toString('hex');

  return { saltPass, hashPass };
}

export default createHashAndSaltPass;
