import { findUser, registryUser } from '../database/usersDb.js';

function registryEvents(socket, io) {
  socket.on('registry_user', async (userData) => {
    const isExistentUser = await findUser(userData.name);

    if (isExistentUser) {
      return socket.emit('existing_user');
    }

    const userToRegistry = await registryUser(userData);
    if (userToRegistry.acknowledged) {
      socket.emit('sucessfull_register');
    } else {
      socket.emit('failed_register');
    }
  });
}

export default registryEvents;
