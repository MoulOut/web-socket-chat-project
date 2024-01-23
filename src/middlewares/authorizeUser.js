import jwt from 'jsonwebtoken';

function authorizeUser(socket, next) {
  const jwtToken = socket.handshake.auth.token;

  try {
    const payloadToken = jwt.verify(jwtToken, process.env.JWT_SECRET);

    socket.emit('jwt_verified', payloadToken);
    next();
  } catch (error) {
    next(error);
  }
}

export default authorizeUser;
