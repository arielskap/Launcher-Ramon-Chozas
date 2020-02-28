const { app, BrowserWindow,ipcMain } = require('electron');
const fs = require("fs");
const crypto = require("crypto");
const child = require('child_process');
const event_listen = require('./main-process/event_listen.js');

let win

app.allowRendererProcessReuse = true;
app.whenReady().then(()=>{
  win = new BrowserWindow({
      width: 1280,
      height: 800,
      frame : false,
      title : "Launcher Ramon Chozas",
      webPreferences: {
      nodeIntegration: true
      }
  })

  process.env.NODE_ENV === "dev" && win.webContents.openDevTools();
  process.env.NODE_ENV === "dev" ? win.loadFile("dev_index.html") : win.loadFile("dist/index.html");

  win.on("closed",()=>{
      win = null;
  })
});

/*

ipcMain.on("login-launcher",(event,args_JSON)=>{

  let data_ws=''
    const options = {
        hostname: 'www.dynamicdoc.com.ar',
        path: '/node/build/validVersion/hash',
        method: 'GET',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    
    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => data_ws+= chunk);
        res.on('end', () => {
        try {
            const parsedData = JSON.parse(data_ws);

            if(parsedData.code !== 200){
              event.reply('reply-login-launcher', {code : parsedData.code, message : parsedData.message });
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
    
    req.end();
});


ipcMain.on("logout-launcher",(event,args_JSON)=>{

});

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

*/
/*
obtieneVersionLocal((local)=>{
  obtieneVersionDelServidor((servidor,dependencias)=>{
    if (local === servidor) {
      ejecutaSistemaChozas()
    }else{
      actualizaSistema(dependencias)
      app.whenReady().then(createWindow)("index.html")
    }
  })
})
*/