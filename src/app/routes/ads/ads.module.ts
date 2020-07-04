import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { DatePipe } from '@angular/common';
import { AddComponent } from './add/add.component';
import { PositionComponent } from './position/position.component';
import { TemplateComponent } from './template/template.component';
import { AdvertiserComponent } from './advertiser/advertiser.component';

const routes: Routes = [
  { path: 'ads_list', component: ListComponent },
  { path: 'ads_position', component: PositionComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'advertiser', component: AdvertiserComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  declarations: [ListComponent, AddComponent, PositionComponent, TemplateComponent, AdvertiserComponent],
  entryComponents: [AddComponent]
})
export class AdsModule { }
