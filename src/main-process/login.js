
const fs = require('fs');
const crypto = require('crypto');

function validVersion(appPath, versionServer) {

  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(appPath);
    stream.on('error', (err) => reject(err));
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  })
    .then((versionLocal) => {
      return versionLocal === versionServer;
    }).catch((err) => {
      console.error(err);
    });
}

function addPropietys(listAPP) {

  const buffer = [];
  listAPP.forEach(async (element) => {

    buffer.push({
      app_name: element.app_name,
      app_path: element.app_path,
      versionServer: 'version_server_for_app',
      isRun: false,
      isUpdate: true,
    });
  });

  return buffer;
}
/**
 *
 * @param {event} event Es el evento que recibos del FRONT, para asi poder responderlo
 * @param {JSON} parsedData Es toda la informacion que recibimos del servidor
 * @return {JSON} Retorna un JSON con todas las aplicaciones a las cuales puede acceder el usuario
 */
function login2(event, parsedData) {

  if (parsedData.code !== 200 || !parsedData.user.list_app) {
    event.reply('reply-login-launcher', {
      code: parsedData.code,
      message: parsedData.message,
    });

    return null;
  }
  const listAPP = [];

  parsedData.user.list_app.forEach(async (element) => {
    const resultValidVersion = await validVersion(element.app_path, element.versionServer);

    listAPP.push({
      app_name: element.app_name,
      app_path: element.app_name,
      isRun: false,
      isUpdate: resultValidVersion,
    });

  });

  console.log(listAPP);

  event.reply('reply-login-launcher', parsedData);
  return (!listAPP || listAPP === []) ? null : listAPP;
}

/**
 *
 * @param {event} event Es el evento que recibos del FRONT, para asi poder responderlo
 * @param {JSON} parsedData Es toda la informacion que recibimos del servidor
 * @return {JSON} Retorna un JSON con todas las aplicaciones a las cuales puede acceder el usuario
 */
function login(event, parsedData) {

  if (parsedData.code !== 200 || !parsedData.user.list_app) {
    event.reply('reply-login-launcher', {
      code: parsedData.code,
      message: parsedData.message,
    });

    return null;
  }

  const buffer = parsedData.user.list_app;
  const listAPP = [];
  buffer.forEach((element) => {
    listAPP.push({
      app_name: element.app_name,
      app_path: element.app_path,
      isRun: false,
    });
  });

  event.reply('reply-login-launcher', parsedData);

  if (!listAPP || listAPP === [] || listAPP === {}) {
    return null;
  }

  return listAPP;
}

module.exports = { login, login2, addPropietys };
