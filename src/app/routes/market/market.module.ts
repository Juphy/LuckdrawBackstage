import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CouponComponent } from './coupon/coupon.component';
import { AddComponent } from './add/add.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  { path: 'coupon', component: CouponComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  declarations: [CouponComponent, AddComponent],
  entryComponents: [AddComponent]
})
export class MarketModule { }
