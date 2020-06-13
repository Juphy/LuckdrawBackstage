import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'template', component: TemplateComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, TemplateComponent]
})
export class ActivityModule { }
