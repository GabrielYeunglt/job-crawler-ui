import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../../../electron/models/job';

@Component({
    selector: 'app-jobdetailpage',
    imports: [CommonModule, RouterModule],
    templateUrl: './jobdetailpage.component.html',
    styleUrl: './jobdetailpage.component.scss'
})
export class JobdetailpageComponent {
    @Input() job: Job | null = null;
    @Output() back = new EventEmitter<void>();

    constructor(private router: Router) {
        const nav = this.router.getCurrentNavigation();
        this.job = nav?.extras.state?.['job'];
    }

    openExternalLink(url: string) {
        window.electron.shell.openExternal(url);
    }

    goBack() {
        this.back.emit();
    }
}
