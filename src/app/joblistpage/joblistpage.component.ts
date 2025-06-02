import { Component, OnInit } from '@angular/core';
import { Job } from '../../../electron/models/job';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';
import { Criteria } from '../../model/criteria';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-joblistpage',
    imports: [CommonModule, FormsModule],
    templateUrl: './joblistpage.component.html',
    styleUrl: './joblistpage.component.scss'
})
export class JoblistpageComponent implements OnInit {
    jobs: Job[] = [];
    pageSize = 10;
    currentPage = 1;
    sortField: keyof Job = 'score';
    sortDirection: 'asc' | 'desc' = 'desc';
    default_criteria: Criteria = { title: '', company: '', location: '', fromDate: this.getDateDaysAgo(1), toDate: this.getDateDaysAgo(0) };
    criteria: Criteria = structuredClone(this.default_criteria);

    constructor(private jobService: JobService, private router: Router) { }

    async ngOnInit() {
        this.jobs = await this.jobService.getJobs();
    }

    get totalPages(): number {
        return Math.ceil(this.jobs.length / this.pageSize);
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
        const sorted = this.sortedJobs();
        const start = (this.currentPage - 1) * this.pageSize;
        return sorted.slice(start, start + this.pageSize);
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
    }

    getDateDaysAgo(days: number): string {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    }

    async clearSearchCriteria(): Promise<void> {
        this.criteria = structuredClone(this.default_criteria);
        await this.jobService.getJobs();
    }

    openExternalLink(url: string) {
        window.electron.shell.openExternal(url);
    }
}
