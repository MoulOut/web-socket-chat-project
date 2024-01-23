const chatConnections = [];

function findConnection(chatName, username) {
  return chatConnections.find((connection) => {
    return connection.chatName === chatName && connection.username === username;
  });
}

function addConnection(connection) {
  chatConnections.push(connection);
}

function obtainChatUsers(chatName) {
  return chatConnections
    .filter((connection) => connection.chatName === chatName)
    .map((connection) => connection.username);
}

function removeConnection(chatName, username) {
  const index = chatConnections.findIndex((connection) => {
    return connection.chatName === chatName && connection.username === username;
  });

  if (index === -1) {
    return;
  } else {
    chatConnections.splice(index, 1);
  }
}

export { addConnection, obtainChatUsers, removeConnection, findConnection };
