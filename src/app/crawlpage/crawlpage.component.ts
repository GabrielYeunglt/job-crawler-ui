import { Component } from '@angular/core';
import { CrawlButtonComponent } from "../shared/crawl-button/crawl-button.component";
import { CommonModule } from '@angular/common';
import { CrawlerService } from '../services/crawler.service';
import { SiteCardComponent } from '../site-card/site-card.component';

@Component({
    selector: 'app-crawlpage',
    imports: [CommonModule, CrawlButtonComponent, SiteCardComponent],
    templateUrl: './crawlpage.component.html',
    styleUrl: './crawlpage.component.scss'
})
export class CrawlpageComponent {
    constructor(private crawler: CrawlerService) { }

    async handleResetJobs() {
        const results = await this.crawler.resetJobs();
    }
}
