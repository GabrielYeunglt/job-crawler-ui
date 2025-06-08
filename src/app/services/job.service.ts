import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Job, JobKeywordJoin, JobViewTime } from '../../../electron/models/job';
import { Criteria } from '../../../electron/models/criteria';
import { Keyword } from '../../../electron/models/keyword';
import { DatabaseResult } from '../../../electron/models/databaseResult';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobService extends BaseService {
    private jobFeaturesSubject = new BehaviorSubject<JobKeywordJoin[]>([]);
    jobFeatures$ = this.jobFeaturesSubject.asObservable();

    // Call this method after fetching features
    setJobFeatures(features: JobKeywordJoin[]) {
        this.jobFeaturesSubject.next(features);
    }

    async addJobViewTime(job_id: number): Promise<DatabaseResult> {
        return await this.invoke<DatabaseResult>('add-view-time', job_id) ?? { changes: 0, lastInsertRowid: 0 };
    }

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
        const result = await this.invoke<JobKeywordJoin[]>('search-job-features', job_ids) ?? [];
        this.setJobFeatures(result); // Set to subject
        return result;
    }

    async searchJobViewTimes(job_ids: number[]): Promise<JobViewTime[]> {
        return (await this.invoke<JobViewTime[]>('search-job-view-times', job_ids)) ?? [];
    }
}
