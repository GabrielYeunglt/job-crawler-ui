import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CrawlerService } from '../../services/crawler.service';

@Component({
    selector: 'app-crawl-button',
    templateUrl: './crawl-button.component.html',
    styleUrl: './crawl-button.component.scss'
})
export class CrawlButtonComponent {
    @Input() label: string = 'Start Crawling';
    @Input() disabled: boolean = false;

    constructor(private crawler: CrawlerService) { }

    @Output() clicked = new EventEmitter<void>();

    async onClick() {
        console.log('click');
        this.clicked.emit();
        const results = await this.crawler.startCrawl('dev');
        console.log('Crawl Results:', results);
    }
}
