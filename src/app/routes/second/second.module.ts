import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { SecondComponent } from './second.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: SecondComponent },
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SecondComponent]
})
export class SecondModule { }
