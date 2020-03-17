
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

// PASO 1
function listSupervisor() {
  ipcRenderer.send('list-supervisor', { userName: input_userNameListSupervisor.value, dni: input_dniListSupervisor.value });
};

// PASO 2
function forget() {
  ipcRenderer.send('forget-password', { userName: input_userNameForget.value, dni: input_dniForget.value, supervisor: input_supervisorForget.value });
};

function expired() {
  ipcRenderer.send('expired-password', { userName: input_userNameExpired.value, password: input_passwordExpired.value, newPassword: input_newPasswordExpired.value, confirmPassword: input_confirmPasswordExpired.value });
};

ipcRenderer.on('reply-login-launcher', (event, argsJSON) => {
  console.log(argsJSON);
});

ipcRenderer.on('reply-open-app', (event, argsJSON) => {
  console.log(argsJSON);
});

ipcRenderer.on('reply-close-app', (event, argsJSON) => {
  console.log(argsJSON);
});

ipcRenderer.on('reply-logout-launcher', (event, argsJSON) => {
  console.log(argsJSON);
});

ipcRenderer.on('reply-forget-password', (event, argsJSON) => {
  console.log(argsJSON);
});

ipcRenderer.on('reply-expired-password', (event, argsJSON) => {
  console.log(argsJSON);
});

ipcRenderer.on('reply-list-supervisor', (event, argsJSON) => {
  console.log(argsJSON);
});
