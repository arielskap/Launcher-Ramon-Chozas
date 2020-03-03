const { ipcMain } = require('electron');
const http = require('http');
const os = require('os');
const child = require('child_process');
const querystring = require('querystring');
const fs = require('fs');
const crypto = require('crypto');
const _LIST_APP_ = require('./list_app.json');

let _LIST_APP_FOR_USER = [];
const _HOSTNAME_ = 'www.dynamicdoc.com.ar';
const _PATH_LOGIN_ = '/node/build/login';
const _PATH_FORGET_ = '/node/build/forget';
const _PATH_UPDATE_ = '/node/build/update';

/**
 * EVENT
 * Hace el REQUEST para el LOGIN.
 * En el JSON debe recibir USERNAME y PASSWORD
 */
ipcMain.on('login-launcher', (event, args_JSON) => {

  if (!args_JSON.userName || args_JSON.userName === undefined || !args_JSON.password || args_JSON.password === undefined) {
    return event.reply('reply-login-launcher', { code: 400, message: "parameters 'userName' or 'password' no found" });
  }

  const postData = querystring.stringify({
    userName: args_JSON.userName,
    password: args_JSON.password,
    user_windows: os.userInfo().username,
  });

  let data_ws = '';
  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_LOGIN_,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => data_ws += chunk);
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data_ws);

        if (parsedData.code !== 200 || !parsedData.list_app) {
          return event.reply('reply-login-launcher', { code: parsedData.code, message: parsedData.message });
        }

        const buffer = parsedData.list_app;
        _LIST_APP_FOR_USER = [];
        buffer.forEach((element) => {
          _LIST_APP_FOR_USER.push({ app_name: element, app_path: 'aca_va_la_ruta', isRun: false });
        });

        event.reply('reply-login-launcher', { code: parsedData.code, message: parsedData.message, firstName: parsedData.firstName, lastName: parsedData.lastName, list_app: parsedData.list_app, list_comunication: parsedData.list_app });

      } catch (e) {
        console.error(`ERROR JSON= ${e.message}`);
        return event.reply('reply-login-launcher', { code: 500, message: 'error_parse_json' });
      }
    });
  });

  req.on('error', (e) => {
    console.error(`ERROR REQUEST: ${e.message}`);
    return event.reply('reply-login-launcher', { code: 500, message: 'error_server' });
  });

  req.write(postData);
  req.end();
});

/**
 * EVENT
 * Hace el REQUEST para restaurar la contraseña.
 * En el JSON debe recibir USERNAME,PASSWORD
 */
ipcMain.on('forget-password', (event, args_JSON) => {

  if (!args_JSON.userName || !args_JSON.dni || !args_JSON.responsible) {
    return event.reply('reply-forget-password', { code: 400, message: 'send parameters= userName,dni,responsible' });
  }

  const postData = querystring.stringify({
    userName: args_JSON.userName,
    dni: args_JSON.dni,
    responsible: args_JSON.responsible,
    user_windows: os.userInfo().username,
  });

  let data_ws = '';
  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_FORGET_,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => data_ws += chunk);
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data_ws);

        if (parsedData.code !== 200 || !parsedData.list_app) {
          return event.reply('reply-forget-password', { code: parsedData.code, message: parsedData.message });
        }

        event.reply('reply-forget-password', { code: parsedData.code, message: parsedData.message, userName: parsedData.userName });

      } catch (e) {
        console.error(`ERROR JSON= ${e.message}`);
        return event.reply('reply-forget-password', { code: 500, message: 'error_parse_json' });
      }
    });
  });

  req.on('error', (e) => {
    console.error(`ERROR REQUEST: ${e.message}`);
    return event.reply('reply-forget-password', { code: 500, message: 'error_server' });
  });

  req.write(postData);
  req.end();
});

/**
 * EVENT
 * Hace el REQUEST para actualizar la contraseña
 * En el JSON debe recibir USERNAME,PASSWORD
 */
ipcMain.on('update-password', (event, args_JSON) => {

  if (!args_JSON.userName || args_JSON.userName === undefined || !args_JSON.newPassword || args_JSON.newPassword === undefined) {
    return event.reply('reply-update-password', { code: 400, message: "parameters 'userName' or 'password' no found" });
  }

  const postData = querystring.stringify({
    userName: args_JSON.userName,
    newPassword: args_JSON.newPassword,
    user_windows: os.userInfo().username,
  });

  let data_ws = '';
  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_UPDATE_,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    },
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => data_ws += chunk);
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(data_ws);

        if (parsedData.code !== 200 || !parsedData.list_app) {
          return event.reply('reply-update-password', { code: parsedData.code, message: parsedData.message });
        }

        event.reply('reply-update-password', { code: parsedData.code, message: parsedData.message, userName: parsedData.userName });

      } catch (e) {
        console.error(`ERROR JSON= ${e.message}`);
        return event.reply('reply-update-password', { code: 500, message: 'error_parse_json' });
      }
    });
  });

  req.on('error', (e) => {
    console.error(`ERROR REQUEST: ${e.message}`);
    return event.reply('reply-login-launcher', { code: 500, message: 'error_server' });
  });

  req.write(postData);
  req.end();
});

/**
 * EVENT
 * Escucha el evento para ABRIR una APP
 */
ipcMain.on('open-app', (event, app_name) => {

  const json_app = _LIST_APP_.find((row_app) => row_app.app_name === app_name);
  const one_app = _LIST_APP_FOR_USER.find((row_app) => row_app.app_name === app_name && row_app.isRun === false);

  if (!json_app) {
    return event.reply('reply-open-app', { code: 400, message: 'app_not_exist', app_name });
  }

  if (!one_app) {
    return event.reply('reply-open-app', { code: 400, message: 'app_in_use', app_name });
  }

  const ls = child.spawn(json_app.app_path);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    _LIST_APP_FOR_USER.forEach((element) => { if (element.app_name === one_app.app_name) element.isRun = false; });
    return event.reply('reply-close-app', { code: 200, message: 'app_close', app_name: json_app.app_name });
  });

  _LIST_APP_FOR_USER.forEach((element) => { if (element.app_name === one_app.app_name) element.isRun = true; });

  return event.reply('reply-open-app', { code: 200, message: 'app_open', app_name });
});

/**
 * EVENT
 * Redefine la lista de APP por usuario cuando cierra la sesion.
 */
ipcMain.on('logout-launcher', (event) => {
  _LIST_APP_FOR_USER = [];
  return event.reply('reply-logout-launcher', { code: 200, message: 'logout_launcher' });
});