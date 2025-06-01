import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
            category_id: [null, Validators.required],
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

    get categoryIdControl(): FormControl {
        return this.form.get('category_id') as FormControl;
    }

    async ngOnInit(): Promise<void> {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const categories = await this.keywordService.getKeywordCategories();
        this.allCategories = categories;

        if (id) {
            this.editing = true;
            const [kw, synonyms] = await Promise.all([
                this.keywordService.getKeyword(id),
                this.keywordService.getKeywordSynonyms(id)
            ]);
            if (kw) {
                this.form.patchValue({
                    id: kw.id,
                    name: kw.name,
                    type: kw.type,
                    category_id: kw.category_id,
                    category: this.allCategories.find(c => c.id === kw.category_id)
                });
                for (const syn of synonyms || []) {
                    this.synonyms.push(this.fb.control(syn.name));
                }
            }
        }
    }

    addSynonym() {
        this.synonyms.push(this.fb.control(''));
    }

    removeSynonym(index: number) {
        this.synonyms.removeAt(index);
    }

    async save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const keyword = this.form.value;
        let keyword_id = this.form.value.id;
        if (this.editing) {
            await this.keywordService.editKeyword(keyword);
        }
        else {
            const reuslt = await this.keywordService.saveKeyword(keyword);
            keyword_id = reuslt;
        }

        for (const control of this.synonyms.controls) {
            const synonym = {
                keyword_id: keyword_id,
                name: control.value
            };
            await this.keywordService.saveKeywordSynonym(synonym);
        }

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
