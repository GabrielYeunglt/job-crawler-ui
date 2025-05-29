// keyword-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordFormComponent } from './keyword-form/keyword-form.component';

const routes: Routes = [
  { path: '', component: KeywordListComponent },
  { path: 'edit/:name', component: KeywordFormComponent },
  { path: 'create', component: KeywordFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeywordRoutingModule { }
