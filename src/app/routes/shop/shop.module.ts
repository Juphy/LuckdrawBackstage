import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'group', component: GroupComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, GroupComponent]
})
export class ShopModule { }
