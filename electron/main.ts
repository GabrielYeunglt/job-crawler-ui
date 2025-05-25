import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { runCrawl } from './selenium/services/crawlService';

async function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // use compiled version
            contextIsolation: true,
            nodeIntegration: true
        }
    });

    win.loadURL(`file://${path.join(__dirname, '../dist/job-crawler-ui/browser/index.html')}`);
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle('start-crawl', async (event, keyword: string) => {
    const results = await runCrawl(keyword);
    return results;
})
