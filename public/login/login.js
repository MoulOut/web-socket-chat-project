import { emitLogin } from "./socket-front-login.js";

const form = document.getElementById('form-login');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = form['input-user'].value;
  const password = form['input-password'].value;

  emitLogin({ user, password });
});
