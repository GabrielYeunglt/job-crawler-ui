import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class CrawlerService extends BaseService {

    async startCrawl(keyword: string): Promise<string[]> {
        return (await this.invoke<string[]>('start-crawl', keyword)) ?? [];
    }
}
