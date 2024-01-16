import { updateTextEditor } from './documento.js';

const socket = io();

function selectdocument(documentName) {
  socket.emit('select_document', documentName, (documentText) => {
    updateTextEditor(documentText);
  });
}

function emitTextEditor(data) {
  socket.emit('text_editor', data);
}

socket.on('text_editor_clients', (text) => {
  updateTextEditor(text);
});

export { emitTextEditor, selectdocument };
