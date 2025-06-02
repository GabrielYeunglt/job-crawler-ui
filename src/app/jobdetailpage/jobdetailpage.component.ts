import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../../../electron/models/job';

@Component({
    selector: 'app-jobdetailpage',
    imports: [CommonModule, RouterModule],
    templateUrl: './jobdetailpage.component.html',
    styleUrl: './jobdetailpage.component.scss'
})
export class JobdetailpageComponent {
    job!: Job;

    constructor(private router: Router) {
        const nav = this.router.getCurrentNavigation();
        this.job = nav?.extras.state?.['job'];
    }
    
    openExternalLink(url: string) {
        window.electron.shell.openExternal(url);
    }
}
