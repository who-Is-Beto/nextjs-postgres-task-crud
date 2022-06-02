function doesHttpOnlyCookieExist(cookieName: string): boolean {
  const date = new Date();
  date.setTime(date.getTime() + 1000);
  const expires = `expires=${date.toUTCString()}`;

  document.cookie = cookieName + "=newValue;path=/;" + expires;
  return document.cookie.indexOf(cookieName + "=") === -1;
}

export default doesHttpOnlyCookieExist;
