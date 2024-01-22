import createHashAndSaltPass from '../utils/createHashAndSaltPass.js';
import { usersCollection } from './dbConnect.js';

function registryUser({ user, password }) {
  const { hashPass, saltPass } = createHashAndSaltPass(password);

  return usersCollection.insertOne({
    name: user,
    password: hashPass,
    saltPass,
  });
}

function findUser(name) {
  return usersCollection.findOne({ name });
}

export { registryUser, findUser };
