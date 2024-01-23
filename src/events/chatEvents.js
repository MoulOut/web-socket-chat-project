import { deleteChat, findChat, updateChat } from '../database/chatsDb.js';
import { addConnection, obtainChatUsers } from '../utils/chatConnections.js';

function chatEvents(socket, io) {
  socket.on('select_document', async ({ chatName, username }, returnText) => {
    const document = await findChat(chatName);

    if (document) {
      socket.join(chatName);

      addConnection({ chatName, username });

      const usersInChat = obtainChatUsers(chatName);

      io.to(chatName).emit('users_in_chat', usersInChat);
      
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
}

export default chatEvents;
