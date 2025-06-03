import { Component, Input, input } from '@angular/core';
import { CrawlerService } from '../services/crawler.service';

@Component({
    selector: 'app-site-card',
    imports: [],
    templateUrl: './site-card.component.html',
    styleUrl: './site-card.component.scss'
})
export class SiteCardComponent {
    @Input() name: string = '';
    @Input() loginUrl: string = '';

    constructor(private crawlService: CrawlerService) { }

    async crawl(): Promise<void> {
        await this.crawlService.crawlSite(this.name);
    }

    login(): void {
        this.openExternalLink(this.loginUrl);
    }

    openExternalLink(url: string) {
        window.electron.shell.openExternal(url);
    }
}
