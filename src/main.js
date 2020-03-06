const { app, BrowserWindow } = require('electron');
require('./main-process/listenEvents.js');

let win;

app.allowRendererProcessReuse = true;
app.whenReady().then(() => {
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
