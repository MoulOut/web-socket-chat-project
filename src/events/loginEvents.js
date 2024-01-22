import { findUser } from '../database/usersDb.js';
import authenticateUser from '../utils/authenticateUser.js';

function loginEvents(socket, io) {
  socket.on('authenticate_user', async ({ user, password }) => {
    const userToAuth = await findUser(user);

    if (userToAuth) {
      const authenticated = await authenticateUser(password, userToAuth);
      console.log(authenticated);
      if (authenticated) {
        socket.emit('successfull_auth');
      } else {
        socket.emit('failed_auth');
      }
    } else {
      socket.emit('user_not_found');
    }
  });
}

export default loginEvents;
