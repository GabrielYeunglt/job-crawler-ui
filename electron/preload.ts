import { contextBridge, ipcRenderer, shell } from 'electron';

contextBridge.exposeInMainWorld('electron', {
    invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
    shell: {
        openExternal: (url: string) => shell.openExternal(url)
    }
});
