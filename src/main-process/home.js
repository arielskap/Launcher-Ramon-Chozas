const fs = require('fs');

function upgradeAPP(argsJSON) {
  child.exec(argsJSON.all_dependencies, (err, data) => {
    if (err) {
      console.log('-------------------------------------------------');
      console.log(err);
      app.quit();
    }
    console.log(data.toString());
  });
}

function versionLocal(callback, pathAPP, hashServidor) {

  new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(pathAPP);
    stream.on('error', (err) => reject(err));
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  })
    .then((hex) => {
      if (hex !== hashServidor) {
        upgradeAPP(pathAPP);
      }
    }).catch((err) => {
      console.error(err);
    });
}

module.exports = { versionLocal, upgradeAPP };

