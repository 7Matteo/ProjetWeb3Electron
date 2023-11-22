const { app, BrowserWindow, ipcMain, nativeTheme, Notification, Menu } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'OmniTask',
    icon: './src/img/wave.png',
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, './src/renderer/index.html'));
  mainWindow.setMenu(null);
  mainWindow.on('closed', () => {
    app.quit();
  });
}

function loadPage(pagePath) {
  mainWindow.loadFile(path.join(__dirname, pagePath));
}

function loadIndexPage() {
  loadPage('./src/renderer/index.html');
}

function loadNotesPage() {
  loadPage('./src/renderer/notes.html');
}

function loadAboutUsPage() {
  loadPage('./src/renderer/aboutUs.html');
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  ipcMain.handle('load-page', (event, pagePath) => {
    loadPage(pagePath);
  });

   // Affichez un message dans la console Web de la fenêtre principale
   mainWindow.webContents.openDevTools(); // Open the Web Console
   mainWindow.webContents.executeJavaScript('console.log("Ceci est un message")')
     .catch((error) => {
       console.error('An error occurred while executing JavaScript:', error);
     });

  const template = [
    {
      label: 'Menu',
      submenu: [
        {
          label: 'Home',
          click: loadIndexPage,
        },
        {
          label: 'Applications',
          click: loadNotesPage,
        },
        {
          label: 'About us',
          click: loadAboutUsPage,
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit(),
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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



