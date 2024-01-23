import { obtainCookies } from '../utils/cookies.js';
import {
  alertAndRedirect,
  successAuthTreatment,
  updateInterfaceUsers,
  updateTextEditor,
} from './chat.js';

const socket = io('/users', {
  auth: {
    token: obtainCookies('jwtToken'),
  },
});

socket.on('jwt_verified', successAuthTreatment);

socket.on('connect_error', (error) => {
  alert(error);
  window.location.href = '/login';
});

function selectdocument(inputData) {
  socket.emit('select_document', inputData, (documentText) => {
    updateTextEditor(documentText);
  });
}

socket.on('users_in_chat', updateInterfaceUsers);

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
