const { ipcMain } = require('electron');
const os = require('os');
const querystring = require('querystring');
const { requestPOST } = require('./requestSV');
const { login } = require('./login');

const _HOSTNAME_ = 'www.dynamicdoc.com.ar';
const _PATH_LOGIN_ = '/node/build/login';
const _PATH_LIST_SUPERVISOR_ = '/node/build/listSupervisor';
const _PATH_FORGET_ = '/node/build/forget';
const _PATH_EXPIRED_ = '/node/build/expired';

/**
 * EVENT
 * Hace el REQUEST para el LOGIN.
 * En el JSON debe recibir USERNAME y PASSWORD
 */
ipcMain.on('login-launcher', (event, argsJSON) => {
  if (!argsJSON.userName || argsJSON.userName === undefined) {
    return event.reply('reply-login-launcher', { code: 401, type: 'local', message: 'Usuario es nulo' });
  }

  if (!argsJSON.password || argsJSON.password === undefined) {
    return event.reply('reply-login-launcher', { code: 402, type: 'local', message: 'Contraseña es nula' });
  }

  const postData = querystring.stringify({ userName: argsJSON.userName, password: argsJSON.password, user_windows: os.userInfo().username });

  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_LOGIN_,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  requestPOST(postData, options, (parsedData, error) => {

    if (error) {
      console.error(`ERROR PETICION = 
                      ${error}`);
      event.reply('reply-login-launcher', { code: 500, message: 'Error Interno' });
      return 1;
    }

    _LIST_APP_FOR_USER = login(event, parsedData);
    return 0;

  });

});

/**
 * EVENT
 * Hace el REQUEST para restaurar la contraseña.
 * En el JSON debe recibir USERNAME,PASSWORD
 */
ipcMain.on('list-supervisor', (event, argsJSON) => {
  if (!argsJSON.userName || !argsJSON.userName === '') {
    return event.reply('reply-list-supervisor', { code: 400, type: 'local', message: 'Usuario es nulo', body: 'userName-dni' });
  }

  if (!argsJSON.dni || !argsJSON.dni < 0) {
    return event.reply('reply-list-supervisor', { code: 400, type: 'local', message: 'DNI es nulo', body: 'userName-dni' });
  }

  const postData = querystring.stringify({ userName: argsJSON.userName, dni: argsJSON.dni, user_windows: os.userInfo().username });

  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_LIST_SUPERVISOR_,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  requestPOST(postData, options, (parsedData, error) => {

    if (error) {
      console.error(`ERROR PETICION = 
                      ${error}`);
      event.reply('reply-list-supervisor', { code: 500, message: 'Error Interno' });
      return 1;
    }

    _LIST_SUPERVISOR_FOR_USER = parsedData.list_supervisor;
    return event.reply('reply-list-supervisor', parsedData);

  });
});

/**
 * EVENT
 * Hace el REQUEST para restaurar la contraseña.
 * En el JSON debe recibir USERNAME,PASSWORD
 */
ipcMain.on('forget-password', (event, argsJSON) => {

  if (!argsJSON.userName || argsJSON.userName === '') {
    return event.reply('reply-forget-password', { code: 401, type: 'local', message: 'Usuario es nulo', body: 'userName-dni-supervisor' });
  }
  if (!argsJSON.dni || !argsJSON.dni < 1) {
    return event.reply('reply-forget-password', { code: 403, type: 'local', message: 'DNI es nulo', body: 'userName-dni-supervisor' });
  }
  if (!argsJSON.supervisor || argsJSON.supervisor === '') {
    return event.reply('reply-forget-password', { code: 404, type: 'local', message: 'Supervisor es nulo', body: 'userName-dni-supervisor' });
  }
  if (!_LIST_SUPERVISOR_FOR_USER || _LIST_SUPERVISOR_FOR_USER.length < 1) {
    return event.reply('reply-forget-password', { code: 400, type: 'local', message: 'Usuario no logeado' });
  }
  if (!_LIST_SUPERVISOR_FOR_USER.find((rowSupervisor) => rowSupervisor === argsJSON.supervisor)) {
    return event.reply('reply-forget-password', { code: 400, type: 'local', message: 'Supervisor no disponible' });
  }

  const postData = querystring.stringify({ userName: argsJSON.userName, dni: argsJSON.dni, supervisor: argsJSON.supervisor, user_windows: os.userInfo().username });

  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_FORGET_,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  requestPOST(postData, options, (parsedData, error) => {

    if (error) {
      console.error(`ERROR PETICION = 
                      ${error}`);
      return event.reply('reply-forget-password', { code: 500, message: 'Error Interno' });
    }

    return event.reply('reply-forget-password', parsedData);

  });
});

/**
 * EVENT
 * Hace el REQUEST para actualizar la contraseña
 * En el JSON debe recibir USERNAME,PASSWORD
 */
ipcMain.on('expired-password', (event, argsJSON) => {
  if (!argsJSON.userName || argsJSON.userName === '') {
    return event.reply('reply-expired-password', { code: 401, type: 'local', message: 'Usuario es nulo', body: 'username-password-newPassword-confirmPassword' });
  }

  if (!argsJSON.password || argsJSON.password === '') {
    return event.reply('reply-expired-password', { code: 402, type: 'local', message: 'Contraseña actual es nula', body: 'username-password-newPassword-confirmPassword' });
  }

  if (!argsJSON.newPassword || argsJSON.newPassword === '') {
    return event.reply('reply-expired-password', { code: 400, type: 'local', message: 'Nueva contraseña es nula', body: 'username-password-newPassword-confirmPassword' });
  }
  if (!argsJSON.confirmPassword || argsJSON.confirmPassword === '') {
    return event.reply('reply-expired-password', { code: 400, type: 'local', message: 'Confirmacion de contraseña es nula', body: 'username-password-newPassword-confirmPassword' });
  }

  if (argsJSON.newPassword.length < 4) {
    return event.reply('reply-expired-password', { code: 400, type: 'local', message: 'Contraseña Insegura' });
  }

  if (argsJSON.newPassword !== argsJSON.confirmPassword) {
    return event.reply('reply-expired-password', { code: 400, type: 'local', message: 'Contraseñas no coinciden' });
  }

  const postData = querystring.stringify({
    userName: argsJSON.userName,
    password: argsJSON.password,
    newPassword: argsJSON.newPassword,
    confirmPassword: argsJSON.confirmPassword,
    user_windows: os.userInfo().username,
  });

  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_EXPIRED_,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  requestPOST(postData, options, (parsedData, error) => {

    if (error) {
      console.error(`ERROR PETICION = 
      ${error}`);
      return event.reply('reply-expired-password', { code: 500, message: 'Error Interno' });
    }
    return event.reply('reply-expired-password', parsedData);
  });
});
