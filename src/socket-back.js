import {
  addChat,
  deleteChat,
  findChat,
  obtainChats,
  updateChat,
} from './database/chatsDb.js';
import io from './server.js';

io.on('connection', (socket) => {
  socket.on('obtain_chats', async (returnChats) => {
    const chats = await obtainChats();

    returnChats(chats);
  });

  socket.on('add_chat', async (chatName) => {
    const chatAlreadyExist = (await findChat(chatName)) !== null;

    if (chatAlreadyExist) {
      socket.emit('existent_chat', chatName);
    } else {
      const chatToAdd = await addChat(chatName);

      if (chatToAdd.acknowledged) {
        io.emit('add_chat_interface', chatName);
      }
    }
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

  socket.on('delete_chat', async (chatName) => {
    const deletedChat = await deleteChat(chatName);

    if (deletedChat.deletedCount) {
      io.emit('delete_chat_interface', chatName);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client ID: ${socket.id} has disconnected
    Reason: ${reason}`);
  });
});
