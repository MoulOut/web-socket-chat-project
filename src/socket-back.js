import chatEvents from './events/chatEvents.js';
import loginEvents from './events/loginEvents.js';
import registryEvents from './events/registryEvents.js';
import startEvents from './events/startEvents.js';
import authorizeUser from './middlewares/authorizeUser.js';
import io from './server.js';

const nspUsers = io.of('/users')

nspUsers.use(authorizeUser);

nspUsers.on('connection', (socket) => {
  startEvents(socket, nspUsers);
  chatEvents(socket, nspUsers);
});

io.of('/').on('connection', (socket) => {
  registryEvents(socket, io);
  loginEvents(socket, io);
});
