import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Job } from '../../../electron/models/job';
import { Criteria } from '../../model/criteria';

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

    async searchJobs(criteria: Criteria): Promise<Job[]> {
        return (await this.invoke<Job[]>('search-jobs', criteria)) ?? [];
    }
}
