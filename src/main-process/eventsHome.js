const { ipcMain } = require('electron');
const child = require('child_process');
const fs = require('fs');
/**
 * EVENT
 * Escucha el evento para ABRIR una APP
 */
ipcMain.on('open-app', (event, appName) => {

  if (!_LIST_APP_FOR_USER || _LIST_APP_FOR_USER.length < 1) {
    return event.reply('reply-open-app', { code: 400, message: 'Usuario no logeado', appName });
  }

  const oneAPP = _LIST_APP_FOR_USER.find((rowAPP) => rowAPP.app_name === appName);

  if (!oneAPP) {
    return event.reply('reply-open-app', { code: 400, type: 'local', message: 'Sin Privilegios', appName });
  }

  if (oneAPP.isRun === true) {
    return event.reply('reply-open-app', { code: 400, type: 'local', message: 'APP en uso', appName });
  }

  try {

    if (!fs.existsSync(oneAPP.app_path)) {
      return event.reply('reply-open-app', { code: 400, type: 'local', message: 'APP no instalada', appName });
    }

    const ls = child.spawn(oneAPP.app_path);

    ls.on('close', (code) => {
      _LIST_APP_FOR_USER.forEach((element) => {
        if (element.app_name === oneAPP.app_name) {
          // eslint-disable-next-line no-param-reassign
          element.isRun = false;
          return event.reply('reply-close-app', { code: 200, message: 'APP cerrada', app_name: oneAPP.app_name });
        };
      });
    });

    _LIST_APP_FOR_USER.forEach((element) => {
      if (element.app_name === oneAPP.app_name) {
        // eslint-disable-next-line no-param-reassign
        element.isRun = true;
      }
    });

    return event.reply('reply-open-app', { code: 200, type: 'local', message: 'APP Abierta', appName });

  } catch (error) {
    console.error(`ERROR PETICION = 
                      ${error}`);
    return event.reply('reply-close-app', { code: 500, message: 'Error al ejecutar APP', app_name: oneAPP.app_name });
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
    message: 'Sesion Cerrada',
  });
});
