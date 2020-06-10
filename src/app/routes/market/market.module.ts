import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CouponComponent } from './coupon/coupon.component';
import { AddComponent } from './add/add.component';
import { DatePipe } from '@angular/common';
import { DailyComponent } from './daily/daily.component';
import { ExchangeComponent } from './exchange/exchange.component';

const routes: Routes = [
  { path: 'coupon', component: CouponComponent },
  { path: 'daily', component: DailyComponent },
  { path: 'exchange', component: ExchangeComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  declarations: [CouponComponent, AddComponent, DailyComponent, ExchangeComponent],
  // AddComponent 添加优惠券
  entryComponents: [AddComponent]
})
export class MarketModule { }
