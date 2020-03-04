import { ipcRenderer as ipc } from 'electron';

export const login = () => {
  ipc.send('login-launcher', { userName: input_userName.value, password: input_password.value });
};

export const openAPP = (btnElement) => {
  ipc.send('open-app', btnElement.id);
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
