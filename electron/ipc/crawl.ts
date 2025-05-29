import { ipcMain } from 'electron';
import { CrawlService } from '../selenium/services/crawlService';

export function registerCrawlIpcHandlers() {
    ipcMain.handle('start-crawl', async (event, keyword: string) => {
        const results = await CrawlService.runCrawl(keyword);
        return results;
    })
}