
const fs = require('fs');
const crypto = require('crypto');
const yauzl = require('yauzl');
const { requestGET, requestGETFile } = require('./requestSV');

const _HOSTNAME_ = 'www.dynamicdoc.com.ar';
const _PATH_ZIP_ = '/node/build/installer';

function getZIPServer(appName, pathFileZIP) {

  const options = {
    hostname: _HOSTNAME_,
    //path: `${_PATH_ZIP_}/${appName}`,
    path: `${_PATH_ZIP_}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return new Promise((resolve, reject) => {

    requestGETFile(pathFileZIP, options, (resultRequest, error) => {
      if (error) {
        console.error(`ERROR PETICION = 
                        ${error}`);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false);
      }
      resolve(true);
    });

  }).then((result) => {
    return result;
  }).catch((err) => {
    console.error(err);
  });
}

function getDependencies(appName) {

  const options = {
    hostname: _HOSTNAME_,
    path: `${_PATH_UPDATE_}/${appName}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  requestGET(options, (parsedData, error) => {
    if (error) {
      console.error(`ERROR PETICION = 
                      ${error}`);
      return 0;
    }

    console.log(appName);
    return 1;

  });
}

function descompressZIP(pathFile) {
  yauzl.open(pathFile, { lazyEntries: true }, (err, zipfile) => {
    if (err) throw err;
    zipfile.readEntry();
    zipfile.on('entry', (entry) => {
      if (/\/$/.test(entry.fileName)) {
        // Directory file names end with '/'.
        // Note that entires for directories themselves are optional.
        // An entry's fileName implicitly requires its parent directories to exist.
        zipfile.readEntry();
      } else {
        // file entry
        zipfile.openReadStream(entry, (err, readStream) => {
          if (err) throw err;
          readStream.on('end', () => {
            zipfile.readEntry();
          });
          console.error(entry);
          const writeStream = fs.createWriteStream(entry.fileName);
          readStream.pipe(writeStream);
        });
      }
    });
  });
}

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
      return reject(parsedData.code);
    }

    const listAPP = [];

    parsedData.user.list_app.forEach(async (element) => {
      const resultValidVersion = await validVersion(element.app_path, element.versionServer);
      listAPP.push({
        app_name: element.app_name,
        app_path: element.app_path,
        isRun: false,
        isUpdate: resultValidVersion,
      });

      if (resultValidVersion) {
        return;
      }
      const resultGetZIP = await getZIPServer(element.app_name, `C:/chozassa_v2/${element.app_name}.zip`);
      if (!resultGetZIP) {
        return;
      }
      //descompressZIP(`C:/chozassa_v2/${element.app_name}.zip`);
      descompressZIP('C:/prueba/hola_zip.zip');

    });

    event.reply('reply-login-launcher', parsedData);
    resolve(listAPP);

  });
}

module.exports = { login, getDependencies };
