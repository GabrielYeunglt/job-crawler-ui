import { Component, OnInit } from '@angular/core';
import { KeywordService } from '../keyword.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-keyword-list',
    standalone: false,
    templateUrl: './keyword-list.component.html',
    styleUrls: ['./keyword-list.component.scss']
})
export class KeywordListComponent implements OnInit {
    keywords: any[] = [];

    constructor(private keywordService: KeywordService, private router: Router) { }

    async ngOnInit(): Promise<void> {
        this.keywords = await this.keywordService.getKeywords();
    }

    editKeyword(name: string) {
        this.router.navigate(['/keyword/edit', name]);
    }

    createKeyword() {
        this.router.navigate(['/keyword/create']);
    }
}