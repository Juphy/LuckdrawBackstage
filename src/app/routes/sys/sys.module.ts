import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { QuestionComponent } from './question/question.component';
import { MoneyComponent } from './money/money.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  { path: 'question', component: QuestionComponent },
  { path: 'money', component: MoneyComponent },
  { path: 'feedback', component: FeedbackComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuestionComponent, MoneyComponent, FeedbackComponent]
})
export class SysModule { }
