# Launcher-Ramon-Chozas

## Electron

1. Los eventos estan divididos en archivos : eventsLogin y eventsHome
    - En LOGIN estan todas las eventos que se realizan cuando el usuario no esta logeado
    - En HOME estan todos los eventos cuando el usuario esta logeado

2. Todos los eventos recibidos en "main" emitiran un evento de respuesta(reply) al "renderer".

3. Para ejecutar **SOLO** Electron en modo DESAROLLO, ejecutar "npm run dev".

#### Codigos de Respuesta (Electron y Servidor)

*NOTA = Para todos los casos, el codigo 500 es un error interno. Es decir, del servidor, mal response, mal request, error en db, otros. Cuando ocurra este error, sera almacenado en el LOG o enviado por MAIL al area de sistemas.*

~~~
LOGIN:
    200 - Login Correcto
    201 - Contraseña Vencida
    401 - Ingrese Usuario
    402 - Ingrese Contraseña
    403 - Usuario Incorrecto
    404 - Contrseña Incorrecta
    405 - Usuario Deshabilitado
~~~
~~~
FORGET_PASSWORD:
    LIST_SUPERVISOR (Step 1):
        200 - Lista Supervisores
        401 - Ingrese Usuario
        402 - Ingrese DNI
        403 - Usuario Incorrecto
        404 - DNI Incorrecto

    SEND_FORGET (Step 2):
        200 - Contraseña Enviada
        401 - Ingrese Usuario
        402 - Ingrese DNI
        403 - Seleccione un Supervisor
        404 - Usuario Incorrecto
        405 - Supervisor No Encontrado
~~~
~~~
PASSWORD_EXPIRED:
    200 - Contraseña Modificada
    401 - Ingrese Usuario
    402 - Ingrese Contraseña Actual
    403 - Ingrese Nueva Contraseña
    404 - Confirme Nueva Contraseña
    405 - Contraseña Insegura
    406 - Contraseñas No Coinciden
    407 - Usuario Invalido
    408 - Contraseña Actual Es Incorrecta
~~~
~~~
APP: 
    200 - APP Ejecutada
    201 - APP Actualizada
    401 - APP No Instalada
    402 - APP No Existe
    403 - Sin Privilegios para esta APP
    404 - APP En Uso
~~~