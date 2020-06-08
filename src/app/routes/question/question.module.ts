import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { AddComponent } from './list/add/add.component';

const routes: Routes = [
  { path: 'question_list', component: ListComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, AddComponent],
  entryComponents: [AddComponent]
})
export class QuestionModule { }
