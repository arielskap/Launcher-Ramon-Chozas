/* eslint-disable no-unused-vars */
const { app, BrowserWindow } = require('electron');
//const eventsHome = require('./main-process/eventsHome.js');
//const eventsLogin = require('./main-process/eventsLogin.js');
const eventsMasterful = require('./main-process/eventsMasterful.js');

global.win;

app.allowRendererProcessReuse = true;
//app.whenReady().then((eventsHome, eventsLogin) => {
app.whenReady().then((eventsMasterful) => {
  global.win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: false,
    center: true,
    title: 'Launcher Ramon Chozas',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  process.env.NODE_ENV === 'dev' && global.win.webContents.openDevTools();
  process.env.NODE_ENV === 'dev' ? global.win.loadFile('./dev_index.html') : global.win.loadFile('../dist/index.html');

  global.win.on('closed', () => {
    global.win = null;
  });
});
