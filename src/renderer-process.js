
const { ipcRenderer } = require('electron');

function login() {
  ipcRenderer.send('login-launcher', { userName: input_userName.value, password: input_password.value });
};

function openAPP(btnElement) {
  ipcRenderer.send('open-app', btnElement.id);
};

function logout() {
  ipcRenderer.send('logout-launcher');
};

function forget() {
  ipcRenderer.send('forget-password', { userName: input_userName.value, dni: input_dni.value });
};

function expired() {
  ipcRenderer.send('expired-password', { userName: input_userName.value, password: input_password.value, newPassword: input_password.value, confirmPassword: input_confirmPassword.value });
};

function listResponsable() {
  ipcRenderer.send('list-responsable');
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

ipcRenderer.on('reply-forget-password', (event, argsJSON) => {
  console.table(argsJSON);
});

ipcRenderer.on('reply-expired-password', (event, argsJSON) => {
  console.table(argsJSON);
});

ipcRenderer.on('reply-list-responsable', (event, argsJSON) => {
  console.table(argsJSON);
});
