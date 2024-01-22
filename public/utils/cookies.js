function defineCookie(key, value) {
  document.cookie = `${key}=${value};path=/`;
}

function obtainCookies(key) {
  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${key}=`))
    ?.split('=')[1];
}

function removeCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export { defineCookie, obtainCookies, removeCookie };
