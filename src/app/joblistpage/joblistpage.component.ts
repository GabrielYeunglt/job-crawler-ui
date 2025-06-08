import { Component, OnInit } from '@angular/core';
import { Job, JobKeywordJoin, JobViewTime } from '../../../electron/models/job';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { Criteria } from '../../../electron/models/criteria';
import { FormsModule } from '@angular/forms';
import { Keyword } from '../../../electron/models/keyword';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-joblistpage',
    imports: [CommonModule, FormsModule],
    templateUrl: './joblistpage.component.html',
    styleUrl: './joblistpage.component.scss'
})
export class JoblistpageComponent implements OnInit {
    jobs: Job[] = [];
    jobFeatures$!: Observable<JobKeywordJoin[]>;
    jobviewtimes: JobViewTime[] = [];
    pageSize = 10;
    currentPage = 1;
    sortField: keyof Job = 'score';
    sortDirection: 'asc' | 'desc' = 'desc';
    default_criteria: Criteria = { title: '', company: '', location: '', fromDate: this.getDateDaysAgo(1), toDate: this.getDateDaysAgo(0) };
    empty_criteria: Criteria = { title: '', company: '', location: '', fromDate: '', toDate: '' };
    criteria: Criteria = structuredClone(this.default_criteria);
    hideSeen: boolean = true;

    constructor(private jobService: JobService, private router: Router) { }

    async ngOnInit() {
        this.jobFeatures$ = this.jobService.jobFeatures$;
        this.search();
    }

    get totalPages(): number {
        let count = this.sortedJobs();
        if (this.hideSeen) {
            count = count.filter(job =>
                !this.jobviewtimes.find(vt => vt.job_id === job.id)
            );
        }
        return Math.ceil(count.length / this.pageSize);
    }

    setSort(field: keyof Job) {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortField = field;
            this.sortDirection = 'desc';
        }
        this.currentPage = 1; // reset to first page on new sort
    }

    sortedJobs(): any[] {
        return [...this.jobs].sort((a, b) => {
            const valA = a[this.sortField];
            const valB = b[this.sortField];
            const dir = this.sortDirection === 'asc' ? 1 : -1;

            if (valA == null) return 1;
            if (valB == null) return -1;

            if (typeof valA === 'string' && typeof valB === 'string') {
                return valA.localeCompare(valB) * dir;
            }

            return valA > valB ? dir : valA < valB ? -dir : 0;
        });
    }

    get paginatedJobs(): Job[] {
        // 1. Start with all jobs
        let jobs = this.sortedJobs();

        // 2. Filter unseen if required
        if (this.hideSeen) {
            jobs = jobs.filter(job =>
                !this.jobviewtimes.find(vt => vt.job_id === job.id)
            );
        }

        // 3. Apply pagination
        const start = (this.currentPage - 1) * this.pageSize;
        return jobs.slice(start, start + this.pageSize);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    showDetail(job: Job): void {
        if (job) {
            this.router.navigate(['/job-detail'], {
                state: { job: job } // Pass it as a named property
            });
        }
    }

    async search(): Promise<void> {
        this.jobs = await this.jobService.searchJobs(this.criteria);
        const job_ids = this.jobs.map(job => job.id);
        await this.jobService.searchJobFeatures(job_ids);
        this.jobviewtimes = await this.jobService.searchJobViewTimes(job_ids);
    }

    getRowColor(job_id: number): string {
        console.log(job_id, this.jobviewtimes);
        const view_time = this.jobviewtimes.find(vt => vt.job_id === job_id)?.view_times ?? 0;

        const colorMap: { [key: number]: string } = {
            1: 'bg-red-100',
            2: 'bg-red-200',
            3: 'bg-red-300',
            4: 'bg-red-400',
            5: 'bg-red-500',
            6: 'bg-red-600',
            7: 'bg-red-700',
            8: 'bg-red-800',
            9: 'bg-red-900'
        };

        if (view_time > 0 && view_time <= 9) {
            return colorMap[view_time];
        } else if (view_time > 9) {
            return 'bg-red-900';
        }

        return '';
    }

    getDateDaysAgo(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    }

    async clearSearchCriteria(): Promise<void> {
        this.criteria = structuredClone(this.empty_criteria);
        await this.jobService.getJobs();
    }

    async defaultSearchCriteria(): Promise<void> {
        this.criteria = structuredClone(this.default_criteria);
        await this.jobService.getJobs();
    }

    async handleViewClick(url: string, job_id: number) {
        this.openExternalLink(url);
        await this.addViewTime(job_id);
    }

    openExternalLink(url: string) {
        window.electron.shell.openExternal(url);
    }

    async addViewTime(job_id: number) {
        await this.jobService.addJobViewTime(job_id);
        const viewTime = this.jobviewtimes.find(vt => vt.job_id === job_id);
        if (viewTime) {
            viewTime.view_times++;
        } else {
            // Optional: handle the case where view time doesn't exist
            this.jobviewtimes.push({ job_id, view_times: 1 });
        }
    }

    getFeaturesForJob(jobId: number, features: JobKeywordJoin[]): string {
        return features
            .filter(f => f.job_id === jobId)
            .map(f => f.name)
            .join(', ');
    }

}
