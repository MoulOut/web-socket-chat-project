import { usersCollection } from './dbConnect.js';

function registryUser({ user, password }) {
  return usersCollection.insertOne({ name: user, password });
}

function findUser(name) {
  return usersCollection.findOne({ user: name });
}

export { registryUser, findUser };
