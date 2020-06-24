import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from './main/main.component';
import { BuildComponent } from './build/build.component';
import { CategoryComponent } from './category/category.component';
import { DatePipe } from '@angular/common';
import { SkuComponent } from './sku/sku.component';
import { SpecComponent } from './spec/spec.component';

const routes: Routes = [
  { path: 'main_list', component: MainComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'spec', component: SpecComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainComponent, BuildComponent, CategoryComponent, SkuComponent, SpecComponent],
  providers: [DatePipe],
  entryComponents: [BuildComponent, SkuComponent]
})
export class MainModule { }