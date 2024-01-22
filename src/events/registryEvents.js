import { findUser, registryUser } from '../database/usersDb.js';
import generateJWT from '../utils/generateJWT.js';

function registryEvents(socket, io) {
  socket.on('registry_user', async (userData) => {
    const isExistentUser = await findUser(userData.user);

    if (isExistentUser) {
      socket.emit('existing_user');
    } else {
      const userToRegistry = await registryUser(userData);
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
