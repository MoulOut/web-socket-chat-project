import { findChat, obtainChats, updateChat } from './chatsDb.js';
import io from './server.js';

io.on('connection', (socket) => {
  socket.on('obtain_chats', async (returnChats) => {
    console.log('Client is soliciting chats from DB.');
    const chats = await obtainChats();

    returnChats(chats);
  });

  socket.on('select_document', async (chatName, returnText) => {
    socket.join(chatName);
    const document = await findChat(chatName);

    if (document) {
      returnText(document.text);
    }
  });

  socket.on('text_editor', async ({ text, chatName }) => {
    const updatedChat = await updateChat(chatName, text);

    if (updatedChat.modifiedCount) {
      socket.to(chatName).emit('text_editor_clients', text);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client ID: ${socket.id} has disconnected
    Reason: ${reason}`);
  });
});
