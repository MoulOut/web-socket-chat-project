function loginEvents(socket, io) {
  socket.on('user_login', (userData) => {
    console.log(userData);
  });
}

export default loginEvents;
