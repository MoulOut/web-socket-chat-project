import { insertChatsLink } from './index.js';

const socket = io();

socket.emit('obtain_chats', (chats) => {
  chats.forEach((chat) => {
    insertChatsLink(chat.name);
  });
});
