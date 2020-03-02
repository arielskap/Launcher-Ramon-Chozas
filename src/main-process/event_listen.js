const { ipcMain } = require('electron');
const http = require("http");
const os = require('os');
const list_app = require('./list_app.json');
let __LIST_APP_RUN__ = {}
const __HOSTNAME__ =  "www.dynamicdoc.com.ar";
const __PATH_LOGIN__ = "/node/build/login"
const querystring = require('querystring');


/**
 * Hace el REQUEST para el LOGIN.
 * En el JSON debe recibir USERNAME y PASSWORD
 */
ipcMain.on("login-launcher",(event,args_JSON)=>{

    if (!args_JSON.userName || args_JSON.userName === undefined || !args_JSON.password || args_JSON.password === undefined ) {
        return event.reply('reply-login-launcher', {code : 400,message : "parameters 'userName' or 'password' no found" }); 
    }

    const postData = querystring.stringify({
            userName : args_JSON.userName,
            password : args_JSON.password,
            user_windows : os.userInfo().username,
        });

    let data_ws=''
      const options = {
          hostname: __HOSTNAME__,
          path: __PATH_LOGIN__,
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length,
          }
      };
    
      const req = http.request(options, (res) => {
          res.setEncoding('utf8');
          res.on('data', (chunk) => data_ws+= chunk);
          res.on('end', () => {
            try {
                let parsedData = JSON.parse(data_ws);
                
                if(parsedData.code !== 200){
                    return event.reply('reply-login-launcher', {code : parsedData.code, message : parsedData.message  });
                }
    
                __LIST_APP_RUN__ = data_ws.message;
                event.reply('reply-login-launcher', {code : parsedData.code, message : parsedData.message });
                
            } catch (e) {
                console.error(`ERROR JSON= ${e.message}`);
                return event.reply('reply-login-launcher', {code : 500,message : "error_parse_json" }); 
            }
          });
      });
      
      req.on('error', (e) => {
          console.error(`ERROR REQUEST: ${e.message}`);
          return event.reply('reply-login-launcher', {code : 500,message : "error_server" }); 
      });
      
      req.write(postData);
      req.end();
});
  
/**
 * Escucha el evento para ABRIR una APP
 */
ipcMain.on('open-app', (event, args_JSON) => {

    if (__LIST_APP_RUN__.find(args_JSON.sistema_chozas) !== null){
        return event.reply('reply-open-app', {code : 400,message : "app_in_use" }); 
    }

    const ls = child.spawn(args_JSON.app_path);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        return event.reply('reply-close-app', {code : 200,message : "app_close" }); 
    });

    __LIST_APP_RUN__.push(args_JSON.app_name);
    return event.reply('reply-open-app', {code : 200,message : "app_opened" }); 
});