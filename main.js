const { app, BrowserWindow,remote,ipcMain } = require('electron');
const fs = require("fs");
const http = require("http");
const crypto = require("crypto");
const child = require('child_process');

let win
const __SISTEMA_CHOZAS__ = "C:/chozassa_v2/chozassa_v2.exe";
const ___MANTEN___ = "C:/Manten/manten.exe";

function createWindow () {
  win = new BrowserWindow({
      width: 900,
      height: 600,
      frame : false,

      title : "Launcher Ramon Chozas",
      webPreferences: {
      nodeIntegration: true
      }
  })  
  win.webContents.openDevTools();

  win.loadFile("index.html")

  win.on("closed",()=>{
      win = null;
  })
}

app.allowRendererProcessReuse = true;
app.on('ready', createWindow)

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
            if (parsedData.hash === "a8d95e78f748109d83fe082151381f") {
              event.reply('reply-login-launcher', data_ws);  
              return 1; 
            }

            win.loadFile("home.html")
            
        } catch (e) {
            console.error(`ERROR= 
            ${e.message}`);
        }
        });
    });
    
    req.on('error', (e) => {
        console.error(`problem with request: 
        ${e.message}`);
    });
    
    req.end();
});

ipcMain.on("logout-launcher",(event,args_JSON)=>{
  win.loadFile("index.html")
})

ipcMain.on('open-app', (event, args_JSON) => {

  const ls = child.spawn(args_JSON.app_path);

  args_JSON.error = null;

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    event.reply('reply-close-app', args_JSON); 
  });

  event.reply('reply-open-app', args_JSON);  
  
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

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