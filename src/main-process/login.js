/**
 *
 * @param {event} event Es el evento que recibos del FRONT, para asi poder responderlo
 * @param {JSON} parsedData Es toda la informacion que recibimos del servidor
 * @return {JSON} Retorna un JSON con todas las aplicaciones a las cuales puede acceder el usuario
 */
function login(event, parsedData) {

  if (parsedData.code !== 200 || !parsedData.list_app) {
    event.reply('reply-login-launcher', {
      code: parsedData.code,
      message: parsedData.message,
    });

    return null;
  }

  const buffer = parsedData.list_app;
  const listAPP = [];
  buffer.forEach((element) => {
    listAPP.push({
      app_name: element,
      app_path: 'aca_va_la_ruta',
      isRun: false,
    });
  });

  event.reply('reply-login-launcher', parsedData);

  return listAPP;
}

/**
 *
 * @param {event} event Es el evento que recibos del FRONT, para asi poder responderlo
 * @param {JSON} parsedData Es toda la informacion que recibimos del servidor
 * @return {JSON} Retorna un JSON con todos los responsables para este usuario
 */
function listResponsable(event, parsedData) {
  event.reply('reply-list-responsable', parsedData);
  return parsedData.list_responsable;
}

/**
 *
 * @param {event} event Es el evento que recibos del FRONT, para asi poder responderlo
 * @param {JSON} parsedData Es toda la informacion que recibimos del servidor
 * @return {Number} Retorna 0 si salio todo bien
 */
function forgetPassword(event, parsedData) {
  return event.reply('reply-forget-password', parsedData);
}

function passwordExpired(event, parsedData) {
  return event.reply('reply-expired-password', parsedData);
}

module.exports = { login, listResponsable, forgetPassword, passwordExpired };
