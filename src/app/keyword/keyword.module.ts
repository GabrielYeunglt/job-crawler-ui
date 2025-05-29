// keyword.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordListComponent } from './keyword-list/keyword-list.component';
import { KeywordFormComponent } from './keyword-form/keyword-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KeywordRoutingModule } from './keyword-routing.module';

@NgModule({
  declarations: [
    KeywordListComponent,
    KeywordFormComponent
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
