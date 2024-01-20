const socket = io();

function emitRegistryUser(userObj) {
  socket.emit('registry_user', userObj);
}

export { emitRegistryUser };
