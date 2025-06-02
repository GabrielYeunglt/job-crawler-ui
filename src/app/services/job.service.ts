import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Job } from '../../../electron/models/job';

@Injectable({
    providedIn: 'root'
})
export class JobService extends BaseService {

    async getJob(id: number): Promise<Job> {
        return (await this.invoke<Job>('get-job', id)) ?? new Job({});
    }

    async getJobs(): Promise<Job[]> {
        return (await this.invoke<Job[]>('get-jobs')) ?? [];
    }
}
