import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { QuestionComponent } from './question/question.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AddQuestionComponent } from './add-question/add-question.component';

const routes: Routes = [
  { path: 'question', component: QuestionComponent },
  { path: 'feedback', component: FeedbackComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuestionComponent, FeedbackComponent, AddQuestionComponent],
  entryComponents: [AddQuestionComponent]
})
export class SysModule { }
