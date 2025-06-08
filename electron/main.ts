import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { CrawlService } from './selenium/services/crawlService';
import { registerKeywordIpcHandlers } from './ipc/keywords';
import { registerCrawlIpcHandlers } from './ipc/crawl';
import { registerWindowHandlers } from './ipc/window';
import { registerJobIpcHandlers } from './ipc/job';

dotenv.config();

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

    // win.loadURL(`file://${path.join(__dirname, '../dist/job-crawler-ui/browser/index.html')}`);
    // Assumes Angular's built output is at dist/job-crawler-ui/index.html
    const indexPath = path.join(__dirname, '../dist/job-crawler-ui/browser/index.html');
    win.loadFile(indexPath);
}

app.whenReady().then(() => {
    createWindow();
    registerKeywordIpcHandlers();
    registerCrawlIpcHandlers();
    registerWindowHandlers();
    registerJobIpcHandlers();
});
