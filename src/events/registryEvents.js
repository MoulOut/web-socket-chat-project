import { findUser, registryUser } from '../database/usersDb.js';
import generateJWT from '../utils/generateJWT.js';

function registryEvents(socket, io) {
  socket.on('registry_user', async ({ user, password }) => {
    const isExistentUser = await findUser(user);

    if (isExistentUser) {
      socket.emit('existing_user');
    } else {
      const userToRegistry = await registryUser({ user, password });
      if (userToRegistry.acknowledged) {
        const jwtToken = generateJWT({ username: user });

        socket.emit('sucessfull_register', jwtToken);
      } else {
        socket.emit('failed_register');
      }
    }
  });
}

export default registryEvents;
