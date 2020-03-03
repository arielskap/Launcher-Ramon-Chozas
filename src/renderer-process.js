const { ipcRenderer } = require('electron');

export const login = () => {
  ipcRenderer.send('login-launcher', { userName: input_userName.value, password: input_password.value });
};

export const openAPP = (btnElement) => {
  ipcRenderer.send('open-app', btnElement.id);
};

export const logout = () => {
  ipcRenderer.send('logout-launcher');
};

ipcRenderer.on('reply-login-launcher', (event, argsJSON) => {
  console.table(argsJSON);
});

ipcRenderer.on('reply-open-app', (event, argsJSON) => {
  console.table(argsJSON);
});

ipcRenderer.on('reply-close-app', (event, argsJSON) => {
  console.table(argsJSON);
});

ipcRenderer.on('reply-logout-launcher', (event, argsJSON) => {
  console.table(argsJSON);
});
