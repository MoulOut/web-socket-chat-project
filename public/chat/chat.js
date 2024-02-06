import {
  emitChatDelete,
  emitTextEditor,
  selectdocument,
} from './socket-front-chat.js';

const params = new URLSearchParams(window.location.search);
const chatName = params.get('name');

const textEditor = document.getElementById('editor-texto');
const chatTitle = document.getElementById('document-title');
const deleteButton = document.getElementById('delete-chat');
const connectedUsersList = document.getElementById('connected-users');

chatTitle.textContent = chatName || 'chat sem titulo';
deleteButton.addEventListener('click', () => {
  emitChatDelete(chatName);
});

function successAuthTreatment(payloadToken) {
  selectdocument({ chatName, username: payloadToken.username });
}

function updateInterfaceUsers(usersInChat) {
  connectedUsersList.innerHTML = '';

  usersInChat.forEach((username) => {
    connectedUsersList.innerHTML += `
    <li class="list-group-item">${username}</li>
    `;
  });
}

textEditor.addEventListener('keyup', () => {
  emitTextEditor({
    text: textEditor.value,
    chatName,
  });
});

function updateTextEditor(text) {
  textEditor.value = text;
}

function alertAndRedirect(chatName) {
  if (chatName === params.get('name')) {
    alert(`Chat ${chatName} excluido!`);
    window.location.href = '/';
  }
}

export {
  updateTextEditor,
  alertAndRedirect,
  successAuthTreatment,
  updateInterfaceUsers,
};
