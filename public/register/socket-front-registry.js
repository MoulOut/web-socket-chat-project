import { defineCookie } from '../utils/cookies.js';

const socket = io();

function emitRegistryUser(userObj) {
  socket.emit('registry_user', userObj);
}

socket.on('sucessfull_register', (jwtToken) => {
  defineCookie('jwtToken', jwtToken);
  alert('Account registred successfully.');
  window.location.href = '/';
});

socket.on('failed_register', () => alert('Failed to register account'));

socket.on('existing_user', () => alert('This user already exists.'));

export { emitRegistryUser };
