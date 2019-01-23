import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleListComponent } from './list/article-list.component';
import { ArticleEntryComponent } from './article-entry/article-entry.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'entry', component: ArticleEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
