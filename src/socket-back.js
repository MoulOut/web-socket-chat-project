import { findDocument, updateChat } from './chatsDb.js';
import io from './server.js';

io.on('connection', (socket) => {
  console.log('A client has connected. ID: ' + socket.id);
  socket.on('select_document', async (documentName, returnText) => {
    socket.join(documentName);
    const document = await findDocument(documentName);

    if (document) {
      returnText(document.text);
    }
  });

  socket.on('text_editor', async ({ text, documentName }) => {
    const updatedChat = await updateChat(documentName, text);

    if (updatedChat.modifiedCount) {
      socket.to(documentName).emit('text_editor_clients', text);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client ID: ${socket.id} has disconnected
    Reason: ${reason}`);
  });
});
