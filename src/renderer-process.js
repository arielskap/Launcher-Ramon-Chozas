
export const login = () => {
  ipc.send('login-launcher', { userName: username.value, password: password.value });
};

export const openAPP = (btnElement) => {
  ipc.send('open-app', btnElement);
};

function expired() {
  ipcRenderer.send('expired-password', { userName: input_userNameExpired.value, password: input_passwordExpired.value, newPassword: input_newPasswordExpired.value, confirmPassword: input_confirmPasswordExpired.value });
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

ipcRenderer.on('reply-list-supervisor', (event, argsJSON) => {
  console.table(argsJSON);
});
