const http = require('http');

/**
   *
   * @param {JSON} postData Es toda la informacion que se enviara al servidor
   * @param {JSON} options Son los parametros para la peticion (hostname,path,method,headers,otros...)
   * @param {function} callback Es la funciona que realizara la accion luego de culminar la peticion al sevidor
   */
function requestPOST(postData, options, callback) {

  let dataWS = '';
  const req = http.request(options, (res) => {

    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      dataWS += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(dataWS);
        callback(parsedData, null);
      } catch (e) {
        callback(null, e.message);
      }
    });

  });

  req.on('error', (e) => {
    callback(null, e.message);
  });

  req.write(postData);
  req.end();
}

/**
   *
   * @param {JSON} options Son los parametros para la peticion (hostname,path,method,headers,otros...)
   * @param {function} callback Es la funciona que realizara la accion luego de culminar la peticion al sevidor
   */
function requestGET(options, callback) {

  let dataWS = '';
  const req = http.request(options, (res) => {

    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      dataWS += chunk;
    });

    res.on('end', () => {
      try {
        const parsedData = JSON.parse(dataWS);
        callback(parsedData, null);
      } catch (e) {
        callback(null, e.message);
      }
    });

  });

  req.on('error', (e) => {
    callback(null, e.message);
  });
  req.end();
}

module.exports = { requestPOST, requestGET };
