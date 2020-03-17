
const fs = require('fs');
const crypto = require('crypto');
const yauzl = require('yauzl');
const { requestGETFile } = require('./requestSV');

const _HOSTNAME_ = 'www.dynamicdoc.com.ar';
const _PATH_ZIP_ = '/node/build/installer';

function getZIPServer(appName, pathFileZIP, nameFileZIP) {
  return new Promise((resolve, reject) => {

    const options = {
      hostname: _HOSTNAME_,
      path: `${_PATH_ZIP_}/${appName}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    requestGETFile(`${pathFileZIP}/${nameFileZIP}`, options, (resultRequest, error) => {
      if (error) {
        console.error(`ERROR PETICION = ${error}`);
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 500, message: 'Error Interno.', body: 'getZIPServer-open' });
      }
      return resolve({ code: 200, message: 'success_getZIPServer', body: '' });
    });

  }).then((result) => {
    return result;
  }).catch((err) => {
    console.error(err);
    return { error };
  });
}

function descompressZIP(pathFile) {
  return new Promise((resolve, reject) => {

    console.log(pathFile);
    yauzl.open(pathFile, { lazyEntries: true }, (err, zipfile) => {
      if (err) {
        console.error(`ERROR YAUZL= ${err}`);
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 500, message: 'Error Interno.', body: 'descompressZIP-open' });
      };
      zipfile.readEntry();
      zipfile.on('entry', (entry) => {
        if (/\/$/.test(entry.fileName)) {
          zipfile.readEntry();
        } else {
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) {
              console.error(`ERROR zipfile= ${err}`);
              return reject({ code: 500, message: 'Error Interno.', body: 'descompressZIP-openReadStream' });
            };
            readStream.on('end', () => {
              zipfile.readEntry();
            });
            const writeStream = fs.createWriteStream(`C:/${entry.fileName}`);
            readStream.pipe(writeStream);
          });
        }
      });
      zipfile.on('close', (entry) => {
        return resolve({ code: 200, message: 'success_descompressZIP', body: '' });
      });
    });
  }).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function validVersion(appPath, appExe, versionServer) {

  return new Promise((resolve, reject) => {

    const app = `${appPath}/${appExe}`;

    if (!fs.existsSync(appPath)) {
      fs.mkdirSync(appPath);
      return resolve('sin_carpeta');
    }
    if (!fs.existsSync(app)) {
      return resolve('sin_exe');
    }
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(app);
    stream.on('error', (err) => reject(err));
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  })
    .then((versionLocal) => {
      return { code: 200, message: 'success_validVersion', body: versionLocal === versionServer };
    }).catch((err) => {
      console.error(err);
      return { code: 500, message: 'Error Interno.', body: 'validVersion-end' };
    });
}

function login(listAPP) {

  return new Promise((resolve, reject) => {

    const bufferListAPP = [];

    listAPP.forEach(async (element) => {
      const resultValidVersion = await validVersion(element.path, element.exe, element.hashServidor);

      if (resultValidVersion.code === 500) {
        bufferListAPP.push({
          name: element.name,
          isRun: false,
          isError: true,
          message: 'APP no instalada',
        });
        return;
      }

      if (resultValidVersion.body) {
        bufferListAPP.push({
          name: element.name,
          path: element.path,
          exe: element.exe,
          isRun: false,
          message: 'APP OK',
        });
        return;
      }

      const resultGetZIP = await getZIPServer(element.name, element.path, element.zip);

      if (resultGetZIP.code === 500) {
        bufferListAPP.push({
          name: element.name,
          path: element.path,
          exe: element.exe,
          isRun: false,
          message: 'Error ZIP_SV',
        });
        return;
      }

      /*
      const resultDescompressZIP = await descompressZIP(`${element.path}/${element.zip}`);

      if (resultDescompressZIP.code === 500) {
        bufferListAPP.push({
          name: element.name,
          path: element.path,
          exe: element.exe,
          isRun: false,
          message: 'Error ZIP_DESC',
        });
      }
      */

      bufferListAPP.push({
        name: element.name,
        path: element.path,
        exe: element.exe,
        isRun: false,
        message: 'APP Actualizada',
      });

    });

    return resolve({ code: 200, message: 'success', body: listAPP });

  }).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

module.exports = { login };
