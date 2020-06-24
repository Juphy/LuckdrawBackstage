import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { TemplateComponent } from './template/template.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ImagesComponent } from './images/images.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'images', component: ImagesComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, TemplateComponent, AddImageComponent, ImagesComponent],
  entryComponents: [AddImageComponent]
})
export class ActivityModule { }
