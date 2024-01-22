import { emitAddChat } from './socket-front-index.js';
import { obtainCookies, removeCookie } from './utils/cookies.js';

const jwtToken = obtainCookies('jwtToken');

const chatsList = document.getElementById('chats-list');
const form = document.getElementById('form-add-chat');
const inputChat = document.getElementById('input-chat');
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
  removeCookie('jwtToken');
  alert('User logged out successfully');
  window.location.href = '/login';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  emitAddChat(inputChat.value);
  inputChat.value = '';
});

function insertChatsLink(chatName) {
  chatsList.innerHTML += `
        <a 
          href="chat/index.html?name=${chatName}"
          class="list-group-item list-group-item-action"
          id="chat-${chatName}"
        >
          ${chatName}
        </a>
   `;
}

function removeChatLink(chatName) {
  const chat = document.getElementById(`chat-${chatName}`);
  chatsList.removeChild(chat);
}

export { insertChatsLink, removeChatLink };
