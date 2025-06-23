import { ipcMain } from 'electron';
import { CrawlService } from '../selenium/services/crawlService';
import { DatabaseService } from '../services/databaseService';

export function registerDatabaseIpcHandlers() {
    ipcMain.handle('manual-query', async (event, query: string) => {
        const results = await DatabaseService.manualQuery(query);
        return results;
    })
}