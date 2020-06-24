import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { AddRoleComponent } from "./add-role/add-role.component";
const routes: Routes = [
  { path: 'list', component: ListComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, AddRoleComponent],
  entryComponents: [AddRoleComponent]
})
export class RoleModule { }
