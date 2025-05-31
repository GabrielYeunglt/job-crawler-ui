import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeywordService } from '../../services/keyword.service';
import { KeywordCategory } from '../../../../electron/models/keyword';

@Component({
    standalone: false,
    selector: 'app-keyword-form',
    templateUrl: './keyword-form.component.html',
    styleUrls: ['./keyword-form.component.scss']
})
export class KeywordFormComponent implements OnInit {
    form: FormGroup;
    // allKeywords: any[] = [];
    allCategories: any[] = [];
    editing: boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private keywordService: KeywordService
    ) {
        this.form = this.fb.group({
            id: [0],
            name: [''],
            type: [0],
            category_id: [0],
            category: this.fb.group({
                id: [0],
                category: [''],
                weight: [0]
            }),
            synonyms: this.fb.array([])
        });
    }

    get synonyms(): FormArray {
        return this.form.get('synonyms') as FormArray;
    }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        Promise.all([
            this.keywordService.getKeyword(id),
            this.keywordService.getKeywordCategories(),
            this.keywordService.getKeywordSynonyms(id)
        ]).then(([kw, categories, synonyms]) => {
            this.allCategories = categories;

            if (id) {
                this.editing = true;
                if (kw) {
                    this.form.patchValue({
                        category: this.allCategories.find(c => c.id === kw.category_id)
                    });
                    for (const syn of synonyms || []) {
                        this.synonyms.push(this.fb.control(syn.name));
                    }
                }
            }
        });
    }

    addSynonym() {
        this.synonyms.push(this.fb.control(''));
    }

    removeSynonym(index: number) {
        this.synonyms.removeAt(index);
    }

    async save() {
        // const value = this.form.value;
        const keyword = this.form.value;
        const category = this.allCategories.find(c => c.id === keyword.category_id) || {
            category: this.form.value.category.name,
            weight: this.form.value.category.weight
        };

        if (!this.form.value.category.name) {
            await this.keywordService.saveKeywordCategory(this.form.value.categories);
        }

        // const keyword = {
        //     ...value,
        //     category,
        //     synonyms: value.synonyms.map((name: string) => ({
        //         keyword_id: value.id || 0,
        //         name
        //     }))
        // };

        // const existing = this.allKeywords.filter(k => k.name !== value.name);
        // existing.push(keyword);

        // await this.keywordService.saveKeywords(existing);
        await this.keywordService.saveKeyword(keyword);
        this.router.navigate(['/keyword']);
    }

    async delete() {
        const id = this.form.value.id;
        await this.keywordService.deleteKeyword(id);
        this.router.navigate(['/keyword']);
    }

    cancel() {
        this.router.navigate(['/keyword']);
    }
}
