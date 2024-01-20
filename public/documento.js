import {
  emitChatDelete,
  emitTextEditor,
  selectdocument,
} from './socket-front-document.js';

const params = new URLSearchParams(window.location.search);
const chatName = params.get('name');

const textEditor = document.getElementById('editor-texto');
const chatTitle = document.getElementById('document-title');
const deleteButton = document.getElementById('delete-chat');

chatTitle.textContent = chatName;
deleteButton.addEventListener('click', () => {
  emitChatDelete(chatName);
});

selectdocument(chatName);

textEditor.addEventListener('keyup', () => {
  emitTextEditor({
    text: textEditor.value,
    documentName: chatName,
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

export { updateTextEditor, alertAndRedirect };
