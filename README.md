# Launcher-Ramon-Chozas

* Electron *

1. Los eventos estan divididos en archivos : Login y Home
    - En LOGIN estan todas las eventos que se realizan cuando el usuario no esta logeado
    - En HOME estan todos los eventos cuando el usuario esta logeado

2. Todos los eventos emitiran un eventos de respuesta (reply)

3. Para ejecutar solo Electron en modo desarrollo, ejecutar "npm run dev".

* Lista de Respuesta * 

200 - login Correcto
201 - Contraseña vencida
400 - Sin parametros para Login
401 - 'userName' no Existe
402 - 'password' invalido
403 - Usuario Deshabilitado