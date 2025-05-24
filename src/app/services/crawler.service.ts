import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CrawlerService {

    constructor() { }

    async startCrawl(keyword: string): Promise<string[]> {
        if (!(window as any).electron?.invoke) {
            console.error('Electron IPC not available');
            return [];
        }
        try {
            const results: string[] = await (window as any).electron.invoke('start-crawl', keyword);
            return results;
        } catch (error) {
            console.error('Crawl failed: ', error);
            return [];
        }
    }
}
