import { ipcMain } from 'electron';
import { DatabaseService } from '../services/databaseService';
import { Criteria } from '../models/criteria';

export function registerJobIpcHandlers() {

    ipcMain.handle('get-job', (event, id: number) => {
        return DatabaseService.getJob(id);
    });

    ipcMain.handle('get-jobs', () => {
        return DatabaseService.getRecentJobs();
    });

    ipcMain.handle('search-jobs', (event, criteria: Criteria) => {
        return DatabaseService.searchJobs(criteria);
    });

    ipcMain.handle('search-job-features', (event, job_ids: number[]) => {
        return DatabaseService.searchJobFeatures(job_ids);
    });

}