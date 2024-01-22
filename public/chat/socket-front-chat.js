import { obtainCookies } from '../utils/cookies.js';
import { alertAndRedirect, updateTextEditor } from './chat.js';

const socket = io('/users', {
  auth: {
    token: obtainCookies('jwtToken'),
  },
});

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login';
});

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

function emitChatDelete(chatName) {
  socket.emit('delete_chat', chatName);
}

socket.on('delete_chat_interface', (chatName) => {
  alertAndRedirect(chatName);
});

export { emitTextEditor, selectdocument, emitChatDelete };
