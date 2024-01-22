const socket = io();

function emitRegistryUser(userObj) {
  socket.emit('registry_user', userObj);
}

socket.on('sucessfull_register', () => {
  alert('Account registred successfully.');
  window.location.href = '/';
});

socket.on('failed_register', () => alert('Failed to register account'));

socket.on('existing_user', () => alert('This user already exists.'));

export { emitRegistryUser };
