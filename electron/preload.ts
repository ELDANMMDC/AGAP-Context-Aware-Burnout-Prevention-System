import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('agap', {
  ping: () => ipcRenderer.invoke('agap:ping'),
});