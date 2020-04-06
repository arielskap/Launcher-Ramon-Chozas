
const { ipcRenderer } = require('electron');

export const login = () => {
  ipcRenderer.send('login-launcher', { userName: username.value, password: password.value });
};

export const openAPP = (btnElement) => {
  ipcRenderer.send('open-app', btnElement);
};

export const logout = () => {
  ipcRenderer.send('logout-launcher');
};

function install(btnElement) {
  ipcRenderer.send('install-app', btnElement.id);
};

// PASO 1
export function listSupervisor(object, callback) {
  ipcRenderer.invoke('list-supervisor', object, callback);
};

// PASO 2
export function forget(object, callback) {
  ipcRenderer.invoke('forget-password', { userName: input_userNameForget.value, dni: input_dniForget.value, supervisor: input_supervisorForget.value }, callback);
};

export function expired() {
  ipcRenderer.send('expired-password', { userName: username.value, password: password.value, newPassword: newPassword.value, confirmPassword: confirmNewPassword.value });
};

/*

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

ipcRenderer.on('reply-list-supervisor', (event, argsJSON) => {
  console.table(argsJSON);
});
*/
