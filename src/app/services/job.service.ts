import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Job, JobKeywordJoin } from '../../../electron/models/job';
import { Criteria } from '../../../electron/models/criteria';
import { Keyword } from '../../../electron/models/keyword';

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

    async searchJobFeatures(job_ids: number[]): Promise<JobKeywordJoin[]> {
        return (await this.invoke<JobKeywordJoin[]>('search-job-features', job_ids)) ?? [];
    }
}
