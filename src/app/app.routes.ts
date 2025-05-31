import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CrawlpageComponent } from './crawlpage/crawlpage.component';

export const routes: Routes = [
    { path: 'keyword', loadChildren: () => import('./keyword/keyword.module').then(m => m.KeywordModule) },
    { path: 'crawl', component: CrawlpageComponent },
    { path: '', component: HomepageComponent },
];