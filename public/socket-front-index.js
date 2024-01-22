import { obtainCookies } from './utils/cookies.js';
import { insertChatsLink, removeChatLink } from './index.js';

const socket = io('/users', {
  auth: {
    token: obtainCookies('jwtToken'),
  },
});

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login';
});

socket.emit('obtain_chats', (chats) => {
  chats.forEach((chat) => {
    insertChatsLink(chat.name);
  });
});

socket.on('add_chat_interface', (chatName) => {
  insertChatsLink(chatName);
});

function emitAddChat(chatName) {
  socket.emit('add_chat', chatName);
}

socket.on('existent_chat', (chatName) => {
  alert(`Chat ${chatName} already exists.`);
});

socket.on('delete_chat_interface', (chatName) => {
  removeChatLink(chatName);
});

export { emitAddChat };
