import { Component } from '@angular/core';
import { CrawlButtonComponent } from "./shared/crawl-button/crawl-button.component";
import { AppRoutingModule } from './app.routes';

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [AppRoutingModule, CrawlButtonComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'job-crawler-ui';
}
