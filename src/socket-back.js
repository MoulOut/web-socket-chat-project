import chatEvents from './events/chatEvents.js';
import startEvents from './events/startEvents.js';
import io from './server.js';

io.on('connection', (socket) => {
  startEvents(socket, io);
  chatEvents(socket, io);
  
  socket.on('disconnect', (reason) => {
    console.log(`Client ID: ${socket.id} has disconnected
    Reason: ${reason}`);
  });
});
