import { emitTextEditor, selectdocument } from './socket-front-document.js';

const params = new URLSearchParams(window.location.search);
const documentName = params.get('name');

const textEditor = document.getElementById('editor-texto');
const documentTitle = document.getElementById('document-title');

documentTitle.textContent = documentName;

selectdocument(documentName);

textEditor.addEventListener('keyup', () => {
  emitTextEditor({
    text: textEditor.value,
    documentName,
  });
});

function updateTextEditor(text) {
  textEditor.value = text;
}

export { updateTextEditor };
