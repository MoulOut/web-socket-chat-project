function registryEvents(socket, io) {
  socket.on('registry_user', (userData) => {
    console.log(userData);
  });
}

export default registryEvents;
