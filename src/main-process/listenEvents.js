const { ipcMain } = require('electron');
const os = require('os');
const child = require('child_process');
const querystring = require('querystring');
const { requestPOST } = require('./requestSV');
const { login, listResponsable, forgetPassword, passwordExpired } = require('./login');
const _LIST_APP_ = require('./list_app.json');

let _LIST_APP_FOR_USER = [];
let _LIST_RESPONSABLE_FOR_USER = [];
const _HOSTNAME_ = 'www.dynamicdoc.com.ar';
const _PATH_LOGIN_ = '/node/build/login';
const _PATH_FORGET_ = '/node/build/forget';
const _PATH_EXPIRED_ = '/node/build/expired';

/**
 * EVENT
 * Hace el REQUEST para el LOGIN.
 * En el JSON debe recibir USERNAME y PASSWORD
 */
ipcMain.on('login-launcher', (event, argsJSON) => {
  if (!argsJSON.userName || argsJSON.userName === undefined || !argsJSON.password || argsJSON.password === undefined) {
    return event.reply('reply-login-launcher', { code: 400, message: "parameters 'userName' or 'password' no found" });
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
      event.reply('reply-login-launcher', { code: 500, message: error });
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
ipcMain.on('list-responsable', (event, argsJSON) => {
  if (!argsJSON.userName || !argsJSON.dni) {
    return event.reply('reply-list-responsable', { code: 400, message: 'without_credentials', body: 'userName-dni' });
  }

  const postData = querystring.stringify({ userName: argsJSON.userName, dni: argsJSON.dni, user_windows: os.userInfo().username });

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
      event.reply('reply-list-responsable', { code: 500, message: error });
      return 1;
    }

    _LIST_RESPONSABLE_FOR_USER = parsedData.list_responsable;
    return event.reply('reply-list-responsable', parsedData);

  });
});

/**
 * EVENT
 * Hace el REQUEST para restaurar la contraseña.
 * En el JSON debe recibir USERNAME,PASSWORD
 */
ipcMain.on('forget-password', (event, argsJSON) => {
  if (!argsJSON.userName || !argsJSON.dni || !argsJSON.responsable) {
    return event.reply('reply-forget-password', { code: 400, message: 'without_credentials', body: 'userName-dni-responsable' });
  }
  if (!_LIST_RESPONSABLE_FOR_USER.find((rowResponsable) => rowResponsable === argsJSON.responsable)) {
    return event.reply('reply-forget-password', { code: 400, message: 'responsable_invalid' });
  }

  const postData = querystring.stringify({ userName: argsJSON.userName, dni: argsJSON.dni, responsible: argsJSON.responsible, user_windows: os.userInfo().username });

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
      return event.reply('reply-forget-password', { code: 500, message: error });
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
  if (!argsJSON.newPassword || !argsJSON.confirmPassword) {
    return event.reply('reply-expired-password', { code: 400, message: 'newPassword or confirmPassword not found' });
  }

  if (argsJSON.newPassword !== argsJSON.confirmPassword) {
    return event.reply('reply-expired-password', { code: 400, message: 'error_in_password' });
  }

  const postData = querystring.stringify({
    userName: argsJSON.userName,
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
      return event.reply('reply-expired-password', { code: 500, message: error });
    }
    return event.reply('reply-expired-password', parsedData);
  });
});

//////////////////// TODOS LOS EVENTOS POSIBLES LUEGO DE ESTAR LOGEADO /////////////////////////

/**
 * EVENT
 * Escucha el evento para ABRIR una APP
 */
ipcMain.on('open-app', (event, appName) => {

  if (!_LIST_APP_FOR_USER || _LIST_APP_FOR_USER.length < 1) {
    return event.reply('reply-open-app', { code: 400, message: 'user_not_logged', appName });
  }

  const jsonAPP = _LIST_APP_.find((rowAPP) => rowAPP.app_name === appName);
  const oneAPP = _LIST_APP_FOR_USER.find((rowAPP) => rowAPP.app_name === appName);

  if (!jsonAPP) {
    return event.reply('reply-open-app', { code: 400, message: 'app_not_exist', appName });
  }

  if (!oneAPP) {
    return event.reply('reply-open-app', { code: 400, message: 'app_forbidden_for_user', appName });
  }

  if (oneAPP.isRun === true) {
    return event.reply('reply-open-app', { code: 400, message: 'app_in_use', appName });
  }

  try {

    const ls = child.spawn(jsonAPP.app_path);

    ls.on('close', (code) => {
      _LIST_APP_FOR_USER.forEach((element) => {
        if (element.app_name === oneAPP.app_name) {
          element.isRun = false;
        };
      });
    });

    _LIST_APP_FOR_USER.forEach((element) => {
      if (element.app_name === oneAPP.app_name) {
        element.isRun = true;
      }
    });

    return event.reply('reply-open-app', { code: 200, message: 'app_open', appName });

  } catch (error) {
    console.error(`${error}. Al Ejecutarse`);
    return event.reply('reply-close-app', { code: 500, message: 'app_error', app_name: jsonAPP.app_name });
  }

});

/**
 * EVENT
 * Redefine la lista de APP por usuario cuando cierra la sesion.
 */
ipcMain.on('logout-launcher', (event) => {
  _LIST_APP_FOR_USER = [];
  return event.reply('reply-logout-launcher', {
    code: 200,
    message: 'logout_launcher',
  });
});
