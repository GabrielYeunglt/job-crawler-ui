import { ipcMain } from 'electron';
import { CrawlService } from '../selenium/services/crawlService';
import { DatabaseService } from '../services/databaseService';

export function registerCrawlIpcHandlers() {
    ipcMain.handle('start-crawl', async (event, keyword: string) => {
        const results = await CrawlService.runCrawl(keyword);
        return results;
    })
    ipcMain.handle('crawl-site', async (event, sitename: string) => {
        const results = await CrawlService.crawlSite(sitename);
        return results;
    })
    ipcMain.handle('login-site', async (event, sitename: string) => {
        const results = await CrawlService.loginSite(sitename);
        return results;
    })
    ipcMain.handle('reset-jobs', async (event) => {
        const results = await DatabaseService.resetJobsTable();
        return results;
    })
}