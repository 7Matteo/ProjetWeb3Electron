const { app, BrowserWindow,ipcMain,nativeTheme, Notification, Menu } = require('electron');
const path = require('path');
const fs = require('fs');


let mainWindow

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createMainWindow = () => {


  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  const mainMenuTemplate = [  ];
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    app.quit();
  });
};


app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});


app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('dark-mode:toggle', () => {
  nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
  return nativeTheme.shouldUseDarkColors;
});

const userDataPath = app.getPath('userData');
const notesFilePath = path.join(userDataPath, 'notes.json');

ipcMain.handle('data:read', () => {
  try {
    const data = fs.readFileSync(notesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading notes:', error);
    return [];
  }
});

ipcMain.handle('data:write', (event, notes) => {
  try {
    const data = JSON.stringify(notes);
    fs.writeFileSync(notesFilePath, data, 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error writing notes:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('notif:send', () => {
  if (process.platform === 'win32') {
    app.setAppUserModelId('Projet Web3 Electron');
  }
  const NOTIFICATION_BODY = 'Your notes have been saved!';
  new Notification({ body: NOTIFICATION_BODY }).show();
});



