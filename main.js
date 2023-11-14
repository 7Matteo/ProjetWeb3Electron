const { app, BrowserWindow, ipcMain , nativeTheme} = require('electron')
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

// dark mode
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

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


