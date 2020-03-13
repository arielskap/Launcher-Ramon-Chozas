
const fs = require('fs');
const crypto = require('crypto');
const querystring = require('querystring');
const { requestPOST } = require('./requestSV');

const _HOSTNAME_ = 'www.dynamicdoc.com.ar';
const _PATH_UPDATE_ = '/node/build/upgrade';

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

/**
 *
 * @param {event} event Es el evento que recibos del FRONT, para asi poder responderlo
 * @param {JSON} parsedData Es toda la informacion que recibimos del servidor
 * @return {JSON} Retorna un JSON con todas las aplicaciones a las cuales puede acceder el usuario
 */
function login(event, parsedData) {

  return new Promise((resolve, reject) => {

    if (parsedData.code !== 200 || !parsedData.user.list_app) {
      event.reply('reply-login-launcher', {
        code: parsedData.code,
        message: parsedData.message,
      });

      reject(parsedData.code);
    }

    const listAPP = [];

    /*const size = parsedData.user.list_app.length;
    const contador = 0;*/

    parsedData.user.list_app.forEach(async (element) => {
      const resultValidVersion = await validVersion(element.app_path, element.versionServer);
      listAPP.push({
        app_name: element.app_name,
        app_path: element.app_path,
        isRun: false,
        isUpdate: resultValidVersion,
      });

      /*
      contador++;
      if (contador === size) {
        event.reply('reply-login-launcher', parsedData);
        resolve(listAPP);
      }*/
    });

    event.reply('reply-login-launcher', parsedData);
    resolve(listAPP);

  });
}

function updateAPP(appName) {

  const postData = querystring.stringify({ userName: argsJSON.userName, password: argsJSON.password, user_windows: os.userInfo().username, app_name: appName });

  const options = {
    hostname: _HOSTNAME_,
    path: _PATH_UPDATE_,
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
      return 0;
    }

    console.log(parsedData);
    return 1;

  });
}

module.exports = { login };
