# Launcher-Ramon-Chozas

* Electron *

1. Los eventos estan divididos en archivos : Login y Home
    - En LOGIN estan todas las eventos que se realizan cuando el usuario no esta logeado
    - En HOME estan todos los eventos cuando el usuario esta logeado

2. Todos los eventos emitiran un eventos de respuesta (reply)

3. Para ejecutar solo Electron en modo desarrollo, ejecutar "npm run dev".

* Lista de Respuesta * 

NOTA = Para todos los casos el codigo 500 es un error interno. Es decir, del servidor, mal response, mal request, error en db, otros.
        Cuando ocurra este error, sera almacenado en el LOG o enviado por MAIL al area de sistemas.

LOGIN:
    200 - login Correcto
    201 - Contraseña vencida
    401 - 'userName' no Existe
    402 - 'password' invalido
    403 - Usuario Deshabilitado
    404 - Usuario Sin APP

PASSWORD FORGET:
    200 - Contraseña Enviada
    401 - 'userName' no Existe
    402 - 'dni' invalido
    403 - Sin Supervisor
    404 - Sin Informacion
    405 - Supervisor No Encontrado

PASSWORD EXPIRED:
    200 - Contraseña Modificada
    401 - 'userName' no Existe
    402 - 'password' no Existe
    403 - 'newPassword' no Existe
    404 - 'confirmPassword' no Existe
    405 - Contraseña Insegura
    406 - Contraseñas no Coinciden

APP : 
    200 - APP Ejecutada Correctamente
    201 - APP Actualizada
    202 - APP No Instalada
    401 - APP No Existe
    401 - Sin Privilegios para esta APP