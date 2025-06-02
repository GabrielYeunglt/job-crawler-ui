import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CrawlpageComponent } from './crawlpage/crawlpage.component';
import { JoblistpageComponent } from './joblistpage/joblistpage.component';
import { JobdetailpageComponent } from './jobdetailpage/jobdetailpage.component';

export const routes: Routes = [
    { path: 'keyword', loadChildren: () => import('./keyword/keyword.module').then(m => m.KeywordModule) },
    { path: 'crawl', component: CrawlpageComponent },
    { path: 'job-list', component: JoblistpageComponent },
    { path: 'job-detail', component: JobdetailpageComponent },
    { path: '', component: HomepageComponent },
];