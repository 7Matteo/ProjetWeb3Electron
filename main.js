const { log } = require('console');
const { app, BrowserWindow, ipcMain , nativeTheme} = require('electron')
const fs = require('fs');
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
  win.setMenu(null);
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
  const mainWindow = BrowserWindow.getAllWindows()[0];

// Affichez un message dans la console Web de la fenêtre principale
  mainWindow.webContents.openDevTools(); // Ouvrir la console Web
  mainWindow.webContents.executeJavaScript('console.log("Ceci est un message');
  
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// dark mode
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})


//persistance des données
//chemin du dossier des données de l'application
const userDataPath = app.getPath('userData');

// Définissez le chemin du fichier notes.json dans le dossier des données de l'application
const notesFilePath = path.join(userDataPath, 'notes.json');

// Lire les notes depuis le fichier JSON
ipcMain.handle('data:read', () => {
  try {
    const data = fs.readFileSync(notesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading notes:', error);
    return { notes: [] };
  }
})


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