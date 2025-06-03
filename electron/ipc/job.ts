import { ipcMain } from 'electron';
import { DatabaseService } from '../services/databaseService';
import { Criteria } from '../models/criteria';

export function registerJobIpcHandlers() {

    ipcMain.handle('add-view-time', (event, job_id: number) => {
        return DatabaseService.saveJobViewTime(job_id);
    })

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

    ipcMain.handle('search-job-view-times', (event, job_ids: number[]) => {
        return DatabaseService.searchJobViewTimes(job_ids);
    });

}