import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeywordService } from '../keyword.service';

@Component({
    selector: 'app-keyword-form',
    standalone: false,
    templateUrl: './keyword-form.component.html',
    styleUrls: ['./keyword-form.component.scss']
})
export class KeywordFormComponent implements OnInit {
    form: FormGroup;
    allKeywords: any[] = [];
    editing: boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private keywordService: KeywordService
    ) {
        this.form = this.fb.group({
            name: [''],
            type: [0], // 0 = all
            category: this.fb.group({
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
        this.keywordService.getKeywords().then(kwList => {
            this.allKeywords = kwList;

            const name = this.route.snapshot.paramMap.get('name');
            if (name) {
                this.editing = true;
                const found = this.allKeywords.find(k => k.name === name);
                if (found) this.form.patchValue(found);
                for (const syn of found.synonyms || []) {
                    this.synonyms.push(this.fb.control(syn));
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
        const updated = this.form.value;
        const existing = this.allKeywords.filter(k => k.name !== updated.name);
        existing.push(updated);
        await this.keywordService.saveKeywords(existing);
        this.router.navigate(['/keyword']);
    }

    async delete() {
        const name = this.form.value.name;
        await this.keywordService.deleteKeyword(name);
        this.router.navigate(['/keyword']);
    }

    cancel() {
        this.router.navigate(['/keyword']);
    }
}
