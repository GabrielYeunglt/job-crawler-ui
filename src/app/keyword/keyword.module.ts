// keyword.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordFormComponent } from './keyword-form/keyword-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KeywordRoutingModule } from './keyword-routing.module';
import { KeywordCategoryListComponent } from './keyword-category-list/keyword-category-list.component';
import { KeywordCategoryFormComponent } from './keyword-category-form/keyword-category-form.component';
import { KeywordMainComponent } from './keyword-main/keyword-main.component';

@NgModule({
    declarations: [
        KeywordListComponent,
        KeywordFormComponent,
        KeywordCategoryListComponent,
        KeywordCategoryFormComponent,
        KeywordMainComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        KeywordRoutingModule
    ]
})
export class KeywordModule { }
