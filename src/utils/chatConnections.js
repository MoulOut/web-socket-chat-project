const chatConnections = [];

function addConnection(connection) {
  chatConnections.push(connection);
}

function obtainChatUsers(chatName) {
  return chatConnections
    .filter((connection) => connection.chatName === chatName)
    .map((connection) => connection.username);
}

export { addConnection, obtainChatUsers };
