import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET;

function generateJWT(payload) {
  const jwtToken = jwt.sign(payload, secretKey, { expiresIn: '1d' });
  return jwtToken;
}

export default generateJWT;
