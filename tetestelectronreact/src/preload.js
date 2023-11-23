const { contextBridge, ipcRenderer } = require('electron')
// const Toastify = require('toastify-js')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // nous pouvons aussi exposer des variables en plus des fonctions
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle')
})

contextBridge.exposeInMainWorld('data', {
  read: () => ipcRenderer.invoke('data:read'),
  write: (notes) => ipcRenderer.invoke('data:write', notes)
})

contextBridge.exposeInMainWorld('notif', {
  send: () => ipcRenderer.invoke('notif:send'),
  showNotification: (body) => {
    const notification = new Notification({ body });
    notification.show();
  },
});

contextBridge.exposeInMainWorld('windowAPI', {
  notif: {
    showNotification: async (message) => {
      return ipcRenderer.invoke('notif:send', message);
    }
  },
});
