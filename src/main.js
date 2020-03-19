/* eslint-disable no-unused-vars */
const { app, BrowserWindow } = require('electron');
//const eventsHome = require('./main-process/eventsHome.js');
//const eventsLogin = require('./main-process/eventsLogin.js');
const eventsMasterful = require('./main-process/eventsMasterful.js');

let win;

app.allowRendererProcessReuse = true;
//app.whenReady().then((eventsHome, eventsLogin) => {
app.whenReady().then((eventsMasterful) => {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    title: 'Launcher Ramon Chozas',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  process.env.NODE_ENV === 'dev' && win.webContents.openDevTools();
  process.env.NODE_ENV === 'dev' ? win.loadFile('./dev_index.html') : win.loadFile('../dist/index.html');

  win.on('closed', () => {
    win = null;
  });
});
