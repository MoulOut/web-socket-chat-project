const socket = io();

function emitLogin(userObj) {
  socket.emit('user_login', userObj);
}

export { emitLogin };
