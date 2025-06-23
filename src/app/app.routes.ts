import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CrawlpageComponent } from './crawlpage/crawlpage.component';
import { JoblistpageComponent } from './joblistpage/joblistpage.component';
import { ManualQueryComponent } from './database/manual-query/manual-query.component';

export const routes: Routes = [
    { path: 'keyword', loadChildren: () => import('./keyword/keyword.module').then(m => m.KeywordModule) },
    { path: 'crawl', component: CrawlpageComponent },
    { path: 'job-list', component: JoblistpageComponent },
    { path: 'manual-query', component: ManualQueryComponent },
    { path: '', component: HomepageComponent },
];