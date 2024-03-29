import { defineCookie } from "../utils/cookies.js";

const socket = io();

function emitAutenticateUser(userObj) {
  socket.emit('authenticate_user', userObj);
}

socket.on('successfull_auth', (jwtToken) => {
  defineCookie('jwtToken', jwtToken);
  alert('User successfully authenticated.');
  window.location.href = '/';
});

socket.on('failed_auth', () => {
  alert('Failed to authenticate.');
});

socket.on('user_not_found', () => {
  alert('User not found.');
});

export { emitAutenticateUser };
