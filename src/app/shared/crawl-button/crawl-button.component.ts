import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CrawlerService } from '../../services/crawler.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-crawl-button',
    imports: [CommonModule],
    templateUrl: './crawl-button.component.html',
    styleUrls: ['./crawl-button.component.scss']
})
export class CrawlButtonComponent {
    @Input() label: string = 'Start Crawling';
    @Input() disabled: boolean = false;

    constructor(private crawler: CrawlerService) { }

    @Output() clicked = new EventEmitter<void>();

    async onClick() {
        this.clicked.emit();
        const results = await this.crawler.startCrawl('dev');
        console.log('Crawl Results:', results);
    }
}
