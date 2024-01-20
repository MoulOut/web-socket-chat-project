import { emitRegistryUser } from "./socket-front-registry.js";

const form = document.getElementById('form-registry');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = form['input-user'].value;
  const password = form['input-password'].value;

  emitRegistryUser({ user, password });
});
