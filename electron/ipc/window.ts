import { BrowserWindow, ipcMain } from "electron";

export function registerWindowHandlers() {
    ipcMain.handle('open-devtools', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender);
        win?.webContents.openDevTools();
    });
}