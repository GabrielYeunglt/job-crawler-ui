import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DatabaseResult } from '../../model/databaseResult';

@Injectable({
    providedIn: 'root'
})
export class CrawlerService extends BaseService {

    async startCrawl(keyword: string): Promise<string[]> {
        return (await this.invoke<string[]>('start-crawl', keyword)) ?? [];
    }

    async resetJobs(): Promise<DatabaseResult> {
        try {
            const result = await this.invoke<DatabaseResult>('reset-jobs');
            if (!result) {
                throw new Error('reset-jobs returned null or undefined');
            }
            return result;
        } catch (err) {
            console.error(`Error when resetting jobs table: ${err}`);
            throw err;
        }
    }

}
