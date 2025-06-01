import { Component } from '@angular/core';
import { CrawlButtonComponent } from "../shared/crawl-button/crawl-button.component";
import { CommonModule } from '@angular/common';
import { CrawlerService } from '../services/crawler.service';

@Component({
    selector: 'app-crawlpage',
    imports: [CommonModule, CrawlButtonComponent],
    templateUrl: './crawlpage.component.html',
    styleUrl: './crawlpage.component.scss'
})
export class CrawlpageComponent {
    constructor(private crawler: CrawlerService) { }

    async handleResetJobs() {
        const results = await this.crawler.resetJobs();
    }
}
