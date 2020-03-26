
const fs = require('fs');
const crypto = require('crypto');
const yauzl = require('yauzl');
const { requestGETFile } = require('./requestSV');

const _HOSTNAME_ = 'www.dynamicdoc.com.ar';
const _PATH_ZIP_ = '/node/build/upgrade';

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

    requestGETFile(`${pathFileZIP}/${nameFileZIP}`, options, (error, resultRequest) => {
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
    yauzl.open(pathFile, { lazyEntries: true }, (err, zipfile) => {
      if (err) {
        console.error(`ERROR YAUZL= ${err} --- ${pathFile}`);
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 500, message: 'Error Interno.', body: 'descompressZIP-open' });
      };
      zipfile.readEntry();
      zipfile.on('entry', (entry) => {
        if (/\/$/.test(entry.fileName)) {
          if (!fs.existsSync(`C:/${entry.fileName}`)) {
            fs.mkdirSync(`C:/${entry.fileName}`);
          }
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
        return resolve({ code: 200, message: 'APP Actualizada', body: '' });
      });
    });
  }).then((result) => {
    return result;
  }).catch((err) => {
    return err;
  });
}

function validVersionZIP(pathZIP, nameZIP, versionServer) {

  const fullPathZIP = `${pathZIP}/${nameZIP}`;

  if (!fs.existsSync(pathZIP) || !fs.existsSync(fullPathZIP)) {
    return { code: 400, message: 'APP No Instalada', body: true };
  }

  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(fullPathZIP);
    stream.on('error', (err) => reject(err));
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  })
    .then((versionLocal) => {
      return { code: 200, message: 'success_validVersion', body: versionLocal === versionServer };
    }).catch((err) => {
      console.error(err);
      return { code: 500, message: 'Error Interno.', body: true };
    });
}

async function checkAPP(app) {

  const resultValidVersion = await validVersionZIP(app.path, app.zip, app.hashServidor);

  if (resultValidVersion.code !== 200) {
    return {
      name: app.name,
      path: app.path,
      exe: app.exe,
      message: resultValidVersion.message,
      isRun: false,
    };
  }

  if (resultValidVersion.body) {
    return {
      name: app.name,
      path: app.path,
      exe: app.exe,
      message: resultValidVersion.message,
      isRun: false,
    };
  }

  const resultGetZIP = await getZIPServer(app.name, app.path, app.zip);

  if (resultGetZIP.code === 500) {
    return {
      name: app.name,
      path: app.path,
      exe: app.exe,
      message: resultGetZIP.message,
      isRun: false,
    };
  }

  const resultDescompressZIP = await descompressZIP(`${app.path}/${app.zip}`);

  return {
    name: app.name,
    path: app.path,
    exe: app.exe,
    message: resultDescompressZIP.message,
    isRun: false,
  };

}

async function login(array) {
  const bufferList = [];

  // -----------------------NO OLVIDAR--------------------
  // ESTE ERROR PUEDE GENERAR QUE TARDE MUCHO LA APLICACION,
  // YA QUE ESPERA POR CADA ITERACION
  // SI DEFINO VARIAS PROMESAS, PUEDO SOLVENTAR ESTO
  for (const item of array) {
    const buffer = await checkAPP(item);
    bufferList.push(buffer);
  };

  return bufferList;
}

module.exports = { login };
