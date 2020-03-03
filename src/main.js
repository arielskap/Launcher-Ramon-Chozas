const { app, BrowserWindow, ipcMain } = require('electron');
const event_listen = require('./main-process/event_listen.js');

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
  process.env.NODE_ENV === 'dev' && win.loadFile('dist/index.html');

  win.on('closed', () => {
    win = null;
  });
});
