const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // nous pouvons aussi exposer des variables en plus des fonctions
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle')
})

contextBridge.exposeInMainWorld('data', {
  read: () => ipcRenderer.invoke('data:read'),
  write: (notes) => ipcRenderer.invoke('data:write', notes)
})
