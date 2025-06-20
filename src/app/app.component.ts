import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrawlButtonComponent } from "./shared/crawl-button/crawl-button.component";

@Component({
    standalone: true,
    selector: 'app-root',
    imports: [RouterOutlet, CrawlButtonComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'job-crawler-ui';
}
