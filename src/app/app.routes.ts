import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'keyword', loadChildren: () => import('./keyword/keyword.module').then(m => m.KeywordModule) },
    { path: '', redirectTo: '/keyword', pathMatch: 'full' },];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }