import './socket-front-index.js';

const chatsList = document.getElementById('chats-list');

function insertChatsLink(chatName) {
  chatsList.innerHTML += `
        <a 
            href="documento.html?name=${chatName}"
            class="list-group-item list-group-item-action"
        >
            ${chatName}
        </a>
   `;
}

export { insertChatsLink };
