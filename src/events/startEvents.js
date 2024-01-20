import { addChat, findChat, obtainChats } from '../database/chatsDb.js';

function startEvents(socket, io) {
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
}

export default startEvents;
