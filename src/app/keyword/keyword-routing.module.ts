// keyword-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordFormComponent } from './keyword-form/keyword-form.component';
import { KeywordCategoryFormComponent } from './keyword-category-form/keyword-category-form.component';
import { KeywordCategoryListComponent } from './keyword-category-list/keyword-category-list.component';
import { KeywordMainComponent } from './keyword-main/keyword-main.component';

const routes: Routes = [
    { path: '', component: KeywordMainComponent },
    { path: 'edit/:id', component: KeywordFormComponent },
    { path: 'create', component: KeywordFormComponent },
    { path: 'category', component: KeywordCategoryListComponent },
    { path: 'edit-category/:id', component: KeywordCategoryFormComponent },
    { path: 'create-category', component: KeywordCategoryFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KeywordRoutingModule { }
