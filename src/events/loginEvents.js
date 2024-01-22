import { findUser } from '../database/usersDb.js';
import authenticateUser from '../utils/authenticateUser.js';
import generateJWT from '../utils/generateJWT.js';

function loginEvents(socket, io) {
  socket.on('authenticate_user', async ({ user, password }) => {
    const userToAuth = await findUser(user);

    if (userToAuth) {
      const authenticated = authenticateUser(password, userToAuth);
      if (authenticated) {
        const jwtToken = generateJWT({ username: user });

        socket.emit('successfull_auth', jwtToken);
      } else {
        socket.emit('failed_auth');
      }
    } else {
      socket.emit('user_not_found');
    }
  });
}

export default loginEvents;
