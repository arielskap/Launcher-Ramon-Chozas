import { ipcRenderer as ipc } from 'electron';

export const login = () => {
  ipc.send('login-launcher', { userName: username.value, password: password.value });
};

export const openAPP = (btnElement) => {
  ipc.send('open-app', btnElement);
};

export const logout = () => {
  ipc.send('logout-launcher');
};

ipc.on('reply-login-launcher', (event, argsJSON) => {
  console.table(argsJSON);
});

ipc.on('reply-open-app', (event, argsJSON) => {
  console.table(argsJSON);
});

ipc.on('reply-close-app', (event, argsJSON) => {
  console.table(argsJSON);
});

ipc.on('reply-logout-launcher', (event, argsJSON) => {
  console.table(argsJSON);
});
