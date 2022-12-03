import { contextBridge } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('app', {
  send: () => {
    console.error(11);
  }
});
