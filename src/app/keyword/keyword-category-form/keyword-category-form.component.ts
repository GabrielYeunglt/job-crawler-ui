import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeywordService } from '../../services/keyword.service';

@Component({
    standalone: false,
    selector: 'app-keyword-category-form',
    templateUrl: './keyword-category-form.component.html',
    styleUrl: './keyword-category-form.component.scss'
})
export class KeywordCategoryFormComponent {

    form: FormGroup;
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
            weight: [0],
        });
    }

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        Promise.all([
            this.keywordService.getKeywordCategory(id),
        ]).then(([category]) => {
            if (category) {
                this.editing = true;
                // Either destructure:
                const { id, name, weight } = category;
                this.form.setValue({ id, name, weight });
            }
        });
    }

    async save() {
        const category = this.form.value;

        if (this.editing) {
            await this.keywordService.editKeywordCategory(category);
        } else {
            await this.keywordService.saveKeywordCategory(category);
        }
        this.router.navigate(['/keyword']);
    }

    async delete() {
        const id = this.form.value.id;
        await this.keywordService.deleteKeywordCategory(id);
        this.router.navigate(['/keyword']);
    }

    cancel() {
        this.router.navigate(['/keyword']);
    }
}
