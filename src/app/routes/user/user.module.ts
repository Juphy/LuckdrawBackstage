import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from './list/list.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: 'list', component: ListComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, AddUserComponent],
  entryComponents: [AddUserComponent]
})
export class UserModule { }
