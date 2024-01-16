import io from './server.js';

const documents = [
  {
    name: 'JavaScript',
    text: 'JavaScript text...',
  },
  {
    name: 'Node',
    text: 'Node text...',
  },
  {
    name: 'Socket.io',
    text: 'Socket.io text...',
  },
];

io.on('connection', (socket) => {
  console.log('A client has connected. ID: ' + socket.id);
  socket.on('select_document', (documentName, returnText) => {
    socket.join(documentName);
    const document = findDocument(documentName);

    if (document) {
      returnText(document.text);
    }
  });

  socket.on('text_editor', ({ text, documentName }) => {
    const document = findDocument(documentName);

    if (document) {
      document.text = text;
      socket.to(documentName).emit('text_editor_clients', text);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`Client ID: ${socket.id} has disconnected
    Reason: ${reason}`);
  });
});

function findDocument(documentName) {
  const document = documents.find((document) => {
    return document.name === documentName;
  });
  return document;
}
