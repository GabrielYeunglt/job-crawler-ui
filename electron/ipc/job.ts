import { ipcMain } from 'electron';
import { DatabaseService } from '../services/databaseService';

export function registerJobIpcHandlers() {

    ipcMain.handle('get-job', (event, id: number) => {
        return DatabaseService.getJob(id);
    });

    ipcMain.handle('get-jobs', () => {
        return DatabaseService.getRecentJobs();
    });

}