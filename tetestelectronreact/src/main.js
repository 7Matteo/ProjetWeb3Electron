const { app, BrowserWindow,ipcMain,nativeTheme, Notification,  } = require('electron');
const path = require('path');
const fs = require('fs');
import fetch from 'electron-fetch'


let mainWindow

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createMainWindow = () => {


  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

 
console.log(MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();


  // Cleanup when the window is closed
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

// Additional main process code goes here.

app.whenReady().then(() => {
   // Affichez un message dans la console Web de la fenêtre principale
   mainWindow.webContents.openDevTools(); // Open the Web Console
   mainWindow.webContents.executeJavaScript('console.log("Ceci est un message")')
     .catch((error) => {
       console.error('An error occurred while executing JavaScript:', error);
     });
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



