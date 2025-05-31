import { Component } from '@angular/core';
import { KeywordService } from '../../services/keyword.service';
import { Router } from '@angular/router';

@Component({
    standalone: false,
    selector: 'app-keyword-category-list',
    templateUrl: './keyword-category-list.component.html',
    styleUrl: './keyword-category-list.component.scss'
})
export class KeywordCategoryListComponent {

    categories: any[] = [];

    constructor(private keywordService: KeywordService, private router: Router) { }

    async ngOnInit(): Promise<void> {
        this.categories = await this.keywordService.getKeywordCategories();
    }

    editKeywordCategory(id: number) {
        this.router.navigate(['/keyword/edit-category', id]);
    }

    createKeywordCategory() {
        this.router.navigate(['/keyword/create-category']);
    }
}
